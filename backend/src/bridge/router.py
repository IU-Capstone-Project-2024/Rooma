from fastapi import APIRouter

from src.bridge.repository import GameRepository
from src.bridge.schemas import CreateGameSchema, CreateGameResponseSchema, GetGameLinkSchema, GetGameLinkResponseSchema
from src.logs.log import log
from src.vars.config import TG_BOT_URL

router = APIRouter(prefix="/bridge", tags=["Bridge"])
game_repo = GameRepository()


@router.post("/")
async def create_bridge(game_data: CreateGameSchema) -> CreateGameResponseSchema:
    created = await game_repo.create_one(game_data)
    log.info(f"Create game with id = {created.game_id}")
    return CreateGameResponseSchema(game_id=created.game_id)


@router.get("/link")
async def get_link(data: GetGameLinkSchema) -> GetGameLinkResponseSchema:
    return GetGameLinkResponseSchema(link=f"{TG_BOT_URL}{data.game_id}")
