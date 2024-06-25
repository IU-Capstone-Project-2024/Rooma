from uuid import UUID

from src.common.repository.game import GameRepository
from src.common.repository.game_state import GameStateRepository
from src.common.repository.user import UserRepository
from src.database import User
from src.games.schemas import (
    CreateGameDTO,
    Game,
    LobbyResponse,
    RulesResponse,
    PostFeedbackDTO, Player,
)
from src.logs.log import log
from src.schemas import SuccessResponse

game_repo = GameRepository()
game_state_repo = GameStateRepository()
user_repo = UserRepository()


class GameService:
    async def create_game(self, data: CreateGameDTO, user: User) -> Game:
        data.owner_telegram_id = user.telegram_id

        created = await game_repo.create_one(data)
        log.info(f"Create game with id = {created.game_id}")

        return Game(**created.model_dump())

    async def join_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.add_user_to_lobby(game_id, user.telegram_id)

        return SuccessResponse(success=True)

    async def leave_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.delete_user_from_lobby(game_id, user.telegram_id)

        return SuccessResponse(success=True)

    async def get_lobby(self, game_id: UUID, user: User) -> LobbyResponse:
        telegram_ids = await game_repo.get_all_telegram_ids_from_lobby(game_id)
        users = await user_repo.get_users_from_telegram_ids(telegram_ids)

        return LobbyResponse(lobby=[Player(**user.model_dump()) for user in users])

    async def start_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.set_active(game_id, is_active=True)

        return SuccessResponse(success=True)

    async def finish_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.set_active(game_id, is_active=False)

        return SuccessResponse(success=True)

    async def get_rules(self, game_id: UUID, user: User) -> RulesResponse:
        pass

    async def get_game(self, game_id: UUID, user: User) -> Game:
        game = await game_repo.get_one_by_game_id(game_id)

        return Game(**game.model_dump())

    async def post_feedback(
            self, data: PostFeedbackDTO, game_id: UUID, user: User
    ) -> SuccessResponse:
        pass
