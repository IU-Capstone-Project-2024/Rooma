from fastapi import APIRouter

from src.bridge.repository import GameRepository
from src.bridge.schemas import CreateGameSchema, CreateGameResponseSchema

router = APIRouter(prefix="/bridge", tags=["Bridge"])
game_repo = GameRepository()


@router.post("/")
async def create_bridge(game_data: CreateGameSchema) -> CreateGameResponseSchema:
    created = await game_repo.create_one(game_data)
    return CreateGameResponseSchema(game_id=created.game_id)
