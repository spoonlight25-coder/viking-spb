"""Собирает демо-копию сайта для GitHub Pages в папку docs/.

На GitHub Pages нет сервера, поэтому в копии отключены отправка заявок и учёт занятого времени (демо-режим).
Запуск: python build_pages.py — после любых правок в clients/viking-spb/site, перед загрузкой на GitHub.
"""
import re
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / 'clients' / 'viking-spb' / 'site'
OUT = HERE / 'docs'

shutil.copytree(SRC, OUT, dirs_exist_ok=True)

config = OUT / 'config.js'
text = config.read_text(encoding='utf-8')
text = re.sub(r"sendTo: '[^']*'", "sendTo: ''", text)
text = re.sub(r"busyUrl: '[^']*'", "busyUrl: ''", text)
config.write_text(text, encoding='utf-8')

print('Готово:', OUT)
