from uuid import UUID

from fastapi import APIRouter, Depends

from src.auth.dependencies import get_user
from src.common.schemas import PopularGameSchema
from src.database.models import User
from src.games.schemas import (
    Game,
    LobbyResponse,
    RulesResponse,
    PostFeedbackDTO,
    ListGamesResponse,
)
from src.games.service import GameService
from src.schemas import SuccessResponse

router = APIRouter(
    prefix="/games",
    tags=["Games"]
)

service = GameService()


@router.get(
    "/list-games",
    response_model=list[ListGamesResponse],
)
async def current_games(user: User = Depends(get_user)):
    return await service.list_games(user)


@router.get(
    "/list-popular",
    response_model=list[PopularGameSchema],
)
async def popular_games(user: User = Depends(get_user)):
    return await service.get_popular(user)


@router.post(
    "/{game_id}/join",
    response_model=SuccessResponse,
)
async def join_game(game_id: UUID, user: User = Depends(get_user)):
    return await service.join_game(game_id, user)


@router.post(
    "/{game_id}/leave",
    response_model=SuccessResponse,
)
async def leave_game(game_id: UUID, user: User = Depends(get_user)):
    return await service.leave_game(game_id, user)


@router.get(
    "/{game_id}/lobby",
    response_model=LobbyResponse,
)
async def get_lobby(game_id: UUID, user: User = Depends(get_user)):
    return await service.get_lobby(game_id, user)


@router.post(
    "/{game_id}/start",
    response_model=SuccessResponse,
)
async def start_game(game_id: UUID, user: User = Depends(get_user)):
    return await service.start_game(game_id, user)


@router.post(
    "/{game_id}/finish",
    response_model=SuccessResponse,
)
async def finish_game(game_id: UUID, user: User = Depends(get_user)):
    return await service.finish_game(game_id, user)


@router.get(
    "/{game_id}/rules",
    response_model=RulesResponse,
)
async def get_rules(game_id: UUID, user: User = Depends(get_user)):
    return await service.get_rules(game_id, user)


@router.get(
    "/{game_id}",
    response_model=Game,
)
async def get_game(game_id: UUID, user: User = Depends(get_user)):
    return await service.get_game(game_id, user)


@router.post(
    "/{game_id}/feedback",
    response_model=SuccessResponse,
)
async def post_feedback(data: PostFeedbackDTO, game_id: UUID, user: User = Depends(get_user)):
    return await service.post_feedback(data, game_id, user)
