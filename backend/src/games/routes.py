from uuid import UUID

from fastapi import APIRouter, Depends

from src.auth.dependencies import verify_token
from src.common.repository.game import GameRepository
from src.common.repository.user import UserRepository
from src.database.models import User
from src.games.schemas import (
    Game,
    CreateGameDTO,
    LobbyResponse,
    RulesResponse,
    PostFeedbackDTO,
)
from src.games.service import GameService
from src.schemas import SuccessResponse

router = APIRouter(
    prefix="/games",
    tags=["Games"],
    dependencies=[Depends(verify_token)],
)

game_repo = GameRepository()
user_repo = UserRepository()

service = GameService()


@router.post(
    "/create",
    response_model=Game,
)
async def create_game(data: CreateGameDTO, user: User = Depends()):
    return await service.create_game(data, user)


@router.post(
    "/{game_id}/join",
    response_model=SuccessResponse,
)
async def join_game(game_id: UUID, user: User = Depends()):
    return await service.join_game(game_id, user)


@router.post(
    "/{game_id}/leave",
    response_model=SuccessResponse,
)
async def leave_game(game_id: UUID, user: User = Depends()):
    return await service.leave_game(game_id, user)


@router.get(
    "/{game_id}/lobby",
    response_model=LobbyResponse,
)
async def get_lobby(game_id: UUID, user: User = Depends()):
    return await service.get_lobby(game_id, user)


@router.post(
    "/{game_id}/start",
    response_model=SuccessResponse,
)
async def start_game(game_id: UUID, user: User = Depends()):
    return await service.start_game(game_id, user)


@router.post(
    "/{game_id}/finish",
    response_model=SuccessResponse,
)
async def finish_game(game_id: UUID, user: User = Depends()):
    return await service.finish_game(game_id, user)


@router.get(
    "/{game_id}/rules",
    response_model=RulesResponse,
)
async def get_rules(game_id: UUID, user: User = Depends()):
    return await service.get_rules(game_id, user)


@router.get(
    "/{game_id}",
    response_model=Game,
)
async def get_game(game_id: UUID, user: User = Depends()):
    return await service.get_game(game_id, user)


@router.post(
    "/{game_id}/feedback",
    response_model=SuccessResponse,
)
async def post_feedback(data: PostFeedbackDTO, game_id: UUID, user: User = Depends()):
    return await service.post_feedback(data, game_id, user)


# @router.post(
#     "/create",
#     response_model=GetGameLinkResponseSchema,
#     responses={status.HTTP_403_FORBIDDEN: {"model": ErrorSchema}},
#
# )
# async def create_game(token: str, telegram_id: int, game_data: CreateGameSchema):
#     """
#     Creates a game object in the database and returns a link to Telegram for token validation.
#
#     If token is invalid, then 403 is returned.
#     """
#     created = await game_repo.create_one(game_data)
#     log.info(f"Create game with id = {created.game_id}")
#     return GetGameLinkResponseSchema(link=f"{TG_BOT_URL}{created.game_id}")
#
#
# @router.post(
#     "/join",
#     responses={status.HTTP_403_FORBIDDEN: {"model": ErrorSchema},
#                status.HTTP_404_NOT_FOUND: {"model": ErrorSchema}},
#     dependencies=[Depends(verify_token)]
# )
# async def join_game(token: str, telegram_id: int, game_id: UUID):
#     """
#     Joins a user to the game by its `game_id`. The user is added to lobby field.
#
#     If user is not found, then 404 is returned.\\
#     If token is invalid, then 403 is returned.
#     """
#     user = await user_repo.get_user(telegram_id)
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Could not find user"
#         )
#     await game_repo.add_user_to_lobby(game_id, user)
#
#
# @router.get(
#     "/lobby",
#     response_model=list[User],
#     responses={status.HTTP_403_FORBIDDEN: {"model": ErrorSchema}},
#     dependencies=[Depends(verify_token)]
# )
# async def get_all_users(token: str, telegram_id: int, game_id: UUID):
#     """
#     Returns all users in the game lobby by its `game_id`.
#
#     If token is invalid, then 403 is returned.
#     """
#     return await game_repo.get_all_users_from_lobby(game_id)
