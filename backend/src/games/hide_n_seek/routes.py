from uuid import UUID

from fastapi import APIRouter, Depends

from src.auth.dependencies import get_user
from src.database.models import User
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

# @router.get(
#
# )

# get all hiders
# get times
# game state
