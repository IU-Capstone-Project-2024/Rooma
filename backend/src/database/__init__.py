from beanie import init_beanie
from motor import motor_asyncio

from src.database.models import Game, User
from src.vars.config import DB_HOST, DB_NAME


async def init_db():
    client = motor_asyncio.AsyncIOMotorClient(DB_HOST)
    database = client[DB_NAME]
    await init_beanie(database=database, document_models=[Game, User])
