from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from src.auth.routes import AuthRouter
from src.auth.schemas import CheckTokenRequestSchema
from src.bridge.schemas import CreateGameSchema, CreateGameResponseSchema, GetGameLinkResponseSchema
from src.common.repository.game import GameRepository
from src.common.repository.user import UserRepository
from src.common.schemas import ErrorSchema
from src.database.models import User
from src.logs.log import log
from src.vars.config import TG_BOT_URL

router = APIRouter(prefix="/bridge", tags=["Bridge"])
game_repo = GameRepository()
user_repo = UserRepository()


@router.post("/game", responses={status.HTTP_403_FORBIDDEN: {"model": ErrorSchema}})
async def create_game(token: str, telegram_id: int, game_data: CreateGameSchema) -> CreateGameResponseSchema:
    check_token = await AuthRouter.check_token(CheckTokenRequestSchema(token=token, telegram_id=telegram_id))
    if not check_token.has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate Telegram ID and token"
        )

    created = await game_repo.create_one(game_data)
    log.info(f"Create game with id = {created.game_id}")
    return CreateGameResponseSchema(game_id=created.game_id)


@router.get("/link")
async def get_link(game_id: UUID) -> GetGameLinkResponseSchema:
    return GetGameLinkResponseSchema(link=f"{TG_BOT_URL}{game_id}")


@router.get("/users")
async def get_all_users(token: str, telegram_id: int, skip: int | None = None, limit: int | None = None) -> list[User]:
    check_token = await AuthRouter.check_token(CheckTokenRequestSchema(token=token, telegram_id=telegram_id))
    if not check_token.has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate Telegram ID and token"
        )

    return await user_repo.get_all(skip=skip, limit=limit)
