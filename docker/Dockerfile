FROM python:3.12-bullseye AS python-base

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY /backend/requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY /backend/src /src

FROM python-base AS rooma-api
CMD ["uvicorn", "src.main:app",  "--host", "0.0.0.0", "--port", "8000"]

FROM python-base AS rooma-bot
CMD ["python", "src/bot.py"]
