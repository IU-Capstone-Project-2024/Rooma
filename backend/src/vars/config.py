from os import getenv

from dotenv import load_dotenv

from src.logs.log import log

IN_DOCKER = getenv("IN_DOCKER", False)

AUTHORIZE_MESSAGE = "Hello there! Here's your link to authorize in Rooma:\nDo not pass it to anyone!"
JOIN_GAME_MESSAGE = "Here's your link to join the game 🎮 Have fun!\nDo not pass it to anyone!"
INFO_MESSAGE = """Hey there! 👋 I'm Rooma, your friendly bot for offline team building games.
Want to host a fun and unforgettable game night with your team? Look no further! Rooma makes it a breeze for organizers and gives players an amazing experience.
With Rooma, you can:

🧩 Organize or join Yes/No Riddles 
       Rules: Be the first to guess the riddle by asking yes or no questions
       
⏱ Play Hide and Seek with a twist 
       Rules: Hide from the seeker and be the last one to be found
...and more!

Get ready for laughter, excitement, and memories that will last a lifetime. Let's play! 🎮"""

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

DB_NAME = getenv("DATABASE_NAME", "Rooma")
DB_HOST = getenv("DATABASE_HOST", "mongodb")
TOKEN = getenv("BOT_TOKEN", "TEST_TOKEN")

REFRESH_AUTH_SECRET = getenv("REFRESH_AUTH_SECRET", "1234567890")
ACCESS_AUTH_SECRET = getenv("ACCESS_AUTH_SECRET", "1234567890")

FRONT_BASE_URL = getenv("FRONT_BASE_URL", "http://localhost")

FRONT_CREATE_GAME_LINK = FRONT_BASE_URL
FRONT_JOIN_GAME_LINK = FRONT_BASE_URL + "/join_game"

LLM_API_KEY = getenv("LLM_API_KEY", "QLWEJKLA")

TESTING = getenv("TESTING", False)
