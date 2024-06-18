import os

from dotenv import load_dotenv

from src.logs.log import log

log.info("Started reading .ENV file")
load_dotenv("../../config/.env")
try:
    DB_NAME = os.environ["DATABASE_NAME"]
    DB_HOST = os.environ["DATABASE_HOST"]
    TG_BOT_URL = os.environ["TG_BOT_URL"]
    TOKEN = os.environ["BOT_TOKEN"]
    FRONT_CREATE_GAME_LINK = os.environ["FRONT_CREATE_GAME_LINK"]
    FRONT_JOIN_GAME_LINK = os.environ["FRONT_JOIN_GAME_LINK"]
    AUTH_SECRET = os.environ["AUTH_SECRET"]


    log.info("Successfully read .ENV file")
except Exception as e:
    log.error(f"Error reading .ENV file {e}")
