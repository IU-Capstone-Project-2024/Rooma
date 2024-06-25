from uuid import UUID

from fastapi import APIRouter, Depends

from src.auth.dependencies import get_user
from src.database.models import User
from src.games.hide_n_seek.schemas import HidersResponse, EndTimesResponse, StateResponse, DurationsResponse
from src.games.hide_n_seek.service import GameService
from src.schemas import SuccessResponse

router = APIRouter(
    prefix="/games/hide-n-seek",
    tags=["Games", "Hide 'n Seek"]
)

service = GameService()


@router.post(
    "/{game_id}/find",
    response_model=SuccessResponse
)
async def find_hider(code: str, game_id: UUID, user: User = Depends(get_user)):
    return await service.find_hider(code, game_id, user)


@router.get(
    "/{game_id}/hiders",
    response_model=HidersResponse
)
async def get_hiders(game_id: UUID, user: User = Depends(get_user)):
    return await service.get_hiders(game_id, user)


@router.get(
    "/{game_id}/end-times",
    response_model=EndTimesResponse
)
async def get_end_times(game_id: UUID, user: User = Depends(get_user)):
    return await service.get_end_time(game_id, user)


@router.get(
    "/{game_id}/durations",
    response_model=DurationsResponse
)
async def get_durations(game_id: UUID, user: User = Depends(get_user)):
    return await service.get_durations(game_id, user)


@router.get(
    "/{game_id}/state",
    response_model=StateResponse
)
async def get_state(game_id: UUID, user: User = Depends(get_user)):
    return await service.get_state(game_id, user)
