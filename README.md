# Викинг — автомойка, Санкт-Петербург

Одностраничный сайт с онлайн-записью и сервер, который принимает заявки в Telegram.

## Что где
- `clients/viking-spb/site/` — сайт (`index.html`, `config.js` с данными и дизайном).
- `server/server.py` — сервер: показывает сайт, принимает заявки, не даёт записать два раза на одно время, шлёт заявки в Telegram.
- `docs/` — демо-копия сайта для GitHub Pages (запись в демо-режиме, заявки никуда не уходят). Собирается командой `python build_pages.py`.

## Запуск с рабочей записью
1. Скопируй `server/.env.example` в `server/.env` и впиши токен бота и свой Telegram ID.
2. Запусти (нужен Python 3.10+, ничего ставить не надо):
   ```
   python server/server.py viking-spb
   ```
3. Открой http://localhost:8000. Остановить сервер — Ctrl+C.

Записи сохраняются в `clients/viking-spb/bookings.json`. Число одновременных машин — `BOXES` в `.env` или ключ `--boxes 2`.

## Как обновить демо
Поправил `clients/viking-spb/site/config.js` → `python build_pages.py` → `git add docs && git commit && git push`.
