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

APP_ROOT_PATH = "/api"
APP_TITLE = "Rooma"
APP_DESCRIPTION = "Online service for offline games"

DB_NAME = getenv("DATABASE_NAME")
DB_HOST = getenv("DATABASE_HOST")
TG_BOT_URL = getenv("TG_BOT_URL")
TOKEN = getenv("BOT_TOKEN")

REFRESH_AUTH_SECRET = getenv("REFRESH_AUTH_SECRET")
ACCESS_AUTH_SECRET = getenv("ACCESS_AUTH_SECRET")

FRONT_BASE_URL = getenv("FRONT_BASE_URL")

FRONT_CREATE_GAME_LINK = FRONT_BASE_URL
FRONT_JOIN_GAME_LINK = FRONT_BASE_URL + "/join_game"
