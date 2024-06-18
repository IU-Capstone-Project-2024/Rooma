import os

from dotenv import load_dotenv

from src.logs.log import log

log.info("Started reading .ENV file")
load_dotenv()
try:
    DB_NAME = os.environ["DATABASE_NAME"]
    DB_HOST = os.environ["DATABASE_HOST"]

    log.info("Successfully read .ENV file")
except Exception as e:
    log.error(f"Error reading .ENV file {e}")
