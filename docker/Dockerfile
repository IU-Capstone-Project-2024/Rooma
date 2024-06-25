FROM python:3.12-bullseye AS python-base

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY /backend/requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY /backend/src /src

FROM python-base AS rooma-api

COPY /backend/src/main.py /main.py
CMD ["fastapi", "run", "main.py"]

FROM python-base AS rooma-bot

COPY /backend/src/bot.py /bot.py
CMD ["python", "bot.py"]

FROM python-base AS rooma-states

COPY /backend/src/state_manager/hide_n_seek/updater.py /updater.py
CMD ["python", "updater.py"]
