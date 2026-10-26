"""Сервер сайта клиента: показывает сайт, принимает записи и пересылает их в Telegram.
Основан на carwash-bot/server.py, только работает для любого клиента фабрики.

Запуск (из папки site-factory):  python server/server.py <slug> [--port 8000] [--boxes 2]
  → открыть http://localhost:8000
Настройки (токен бота, кому слать, сколько боксов) — в server/.env; если его нет, берётся ../carwash-bot/.env.
Записи клиента хранятся в clients/<slug>/bookings.json; лишнюю запись можно удалить оттуда вручную.
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
ENV_FILES = [HERE / '.env', ROOT.parent / 'carwash-bot' / '.env']
MAX_BODY = 10_000
MIN_SECONDS_BETWEEN_REQUESTS = 10
MAX_DURATION = 12 * 60
WEEKDAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

parser = argparse.ArgumentParser(description='Сайт клиента с записью в Telegram')
parser.add_argument('slug', help='папка клиента в clients/, например viking-spb')
parser.add_argument('--port', type=int, help='порт (по умолчанию PORT из .env или 8000)')
parser.add_argument('--boxes', type=int, help='сколько машин можно мыть одновременно (по умолчанию BOXES из .env или 1)')
ARGS = parser.parse_args()

CLIENT_DIR = ROOT / 'clients' / ARGS.slug
SITE_DIR = CLIENT_DIR / 'site'
BOOKINGS_FILE = CLIENT_DIR / 'bookings.json'
if not (SITE_DIR / 'index.html').exists():
    sys.exit(f'Нет сайта: {SITE_DIR}')


def load_env() -> dict[str, str]:
    env_file = next((f for f in ENV_FILES if f.exists()), None)
    if not env_file:
        sys.exit('Нет файла с настройками бота: создай server/.env (TELEGRAM_TOKEN, TELEGRAM_CHAT_IDS, BOXES)')
    env = {}
    for line in env_file.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.strip().startswith('#'):
            key, value = line.split('=', 1)
            env[key.strip()] = value.strip()
    return env


ENV = load_env()
TOKEN = ENV['TELEGRAM_TOKEN']
CHAT_IDS = [c.strip() for c in ENV['TELEGRAM_CHAT_IDS'].split(',') if c.strip()]
BOXES = ARGS.boxes or int(ENV.get('BOXES', 1))
last_request_by_ip: dict[str, float] = {}
bookings_lock = threading.Lock()


def site_name() -> str:
    """Название из config.js клиента — чтобы в Telegram было видно, с какого сайта заявка."""
    m = re.search(r"\bname:\s*'([^']*)'", (SITE_DIR / 'config.js').read_text(encoding='utf-8'))
    return m.group(1) if m else ARGS.slug


SITE_NAME = site_name()


def load_bookings() -> list[dict]:
    if not BOOKINGS_FILE.exists():
        return []
    return json.loads(BOOKINGS_FILE.read_text(encoding='utf-8'))


def save_bookings(bookings: list[dict]) -> None:
    tmp = BOOKINGS_FILE.with_suffix('.tmp')
    tmp.write_text(json.dumps(bookings, ensure_ascii=False, indent=2), encoding='utf-8')
    tmp.replace(BOOKINGS_FILE)


def to_minutes(hhmm: str) -> int:
    h, m = hhmm.split(':')
    return int(h) * 60 + int(m)


def busy_intervals(bookings: list[dict], day: str) -> list[tuple[int, int]]:
    result = []
    for b in bookings:
        if b.get('date') == day:
            start = to_minutes(b['time'])
            result.append((start, start + int(b['duration'])))
    return result


def boxes_used(intervals: list[tuple[int, int]], start: int, end: int) -> int:
    """Сколько боксов занято в самый загруженный момент промежутка [start, end)."""
    moments = [start] + [s for s, _ in intervals if start < s < end]
    return max(sum(1 for s, e in intervals if s <= m < e) for m in moments)


def format_message(b: dict) -> str:
    e = lambda key: html.escape(str(b.get(key, '')).strip()[:200])
    d = date.fromisoformat(b['date'])
    lines = [
        f'🚗 <b>Новая запись — {html.escape(SITE_NAME)}</b>',
        '',
        f"<b>Услуга:</b> {e('service')}",
        f"<b>Когда:</b> {d:%d.%m.%Y} ({WEEKDAYS[d.weekday()]}), {e('time')}",
        f"<b>Телефон:</b> {e('phone')}",
    ]
    if b.get('name'):
        lines.append(f"<b>Имя:</b> {e('name')}")
    if b.get('price'):
        lines.append(f"<b>Стоимость:</b> {e('price')}")
    return '\n'.join(lines)


def send_to_telegram(text: str) -> bool:
    ok = True
    for chat_id in CHAT_IDS:
        data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text, 'parse_mode': 'HTML'}).encode()
        try:
            urllib.request.urlopen(f'https://api.telegram.org/bot{TOKEN}/sendMessage', data=data, timeout=15).close()
        except urllib.error.URLError as err:
            print('Не удалось отправить в Telegram:', err, file=sys.stderr)
            ok = False
    return ok


def valid_booking(b: object) -> bool:
    if not isinstance(b, dict) or not all(b.get(k) for k in ('service', 'date', 'time', 'phone', 'duration')):
        return False
    try:
        date.fromisoformat(b['date'])
    except (TypeError, ValueError):
        return False
    return (re.fullmatch(r'\d{2}:\d{2}', str(b['time'])) is not None
            and isinstance(b['duration'], int) and 0 < b['duration'] <= MAX_DURATION)


class Handler(SimpleHTTPRequestHandler):
    def client_ip(self) -> str:
        # за туннелем все запросы приходят с 127.0.0.1, настоящий адрес — в X-Forwarded-For
        return (self.headers.get('X-Forwarded-For') or self.client_address[0]).split(',')[0].strip()

    def do_GET(self) -> None:
        url = urllib.parse.urlparse(self.path)
        if url.path != '/api/busy':
            return super().do_GET()
        day = urllib.parse.parse_qs(url.query).get('date', [''])[0]
        with bookings_lock:
            intervals = busy_intervals(load_bookings(), day)
        self.reply(200, {'boxes': BOXES, 'busy': intervals})

    def do_POST(self) -> None:
        if self.path != '/api/booking':
            return self.send_error(404)

        ip = self.client_ip()
        now = time.time()
        if now - last_request_by_ip.get(ip, 0) < MIN_SECONDS_BETWEEN_REQUESTS:
            return self.reply(429, {'ok': False, 'error': 'too many requests'})

        length = int(self.headers.get('Content-Length') or 0)
        if not 0 < length <= MAX_BODY:
            return self.reply(400, {'ok': False, 'error': 'bad request'})
        try:
            booking = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return self.reply(400, {'ok': False, 'error': 'bad json'})
        if not valid_booking(booking):
            return self.reply(400, {'ok': False, 'error': 'missing fields'})

        start = to_minutes(booking['time'])
        with bookings_lock:
            bookings = load_bookings()
            intervals = busy_intervals(bookings, booking['date'])
            if boxes_used(intervals, start, start + booking['duration']) >= BOXES:
                return self.reply(409, {'ok': False, 'error': 'busy'})
            last_request_by_ip[ip] = now
            if not send_to_telegram(format_message(booking)):
                return self.reply(502, {'ok': False, 'error': 'telegram unavailable'})
            bookings.append({k: booking.get(k) for k in
                             ('date', 'time', 'duration', 'service', 'price', 'name', 'phone', 'createdAt')})
            save_bookings(bookings)
        self.reply(200, {'ok': True})

    def reply(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)


if __name__ == '__main__':
    port = ARGS.port or int(ENV.get('PORT', 8000))
    server = ThreadingHTTPServer(('0.0.0.0', port), partial(Handler, directory=str(SITE_DIR)))
    print(f'{SITE_NAME}: http://localhost:{port}  (боксов: {BOXES}, остановить — Ctrl+C)')
    server.serve_forever()
