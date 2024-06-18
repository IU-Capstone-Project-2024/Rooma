from os import getenv

from dotenv import load_dotenv

load_dotenv()

SECRET = getenv("AUTH_SECRET")
