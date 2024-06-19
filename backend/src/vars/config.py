from os import getenv

from dotenv import load_dotenv

from src.logs.log import log

IN_DOCKER = getenv("IN_DOCKER", False)

if not IN_DOCKER:
    log.info("Application is running locally, reading .env file in config.py")

    try:
        load_dotenv("../config/.env")
        log.info("Successfully read .env file")
    except Exception as e:
        log.error(f"Error reading .env file: {e}")
else:
    log.info("Application is running in Docker, no need to read .env file in config.py")


DB_NAME = getenv("DATABASE_NAME")
DB_HOST = getenv("DATABASE_HOST")
TG_BOT_URL = getenv("TG_BOT_URL")
TOKEN = getenv("BOT_TOKEN")
FRONT_CREATE_GAME_LINK = getenv("FRONT_CREATE_GAME_LINK")
FRONT_JOIN_GAME_LINK = getenv("FRONT_JOIN_GAME_LINK")
AUTH_SECRET = getenv("AUTH_SECRET")
