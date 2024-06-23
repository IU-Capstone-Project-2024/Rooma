from uuid import UUID

from src.database import User
from src.games.schemas import (
    CreateGameDTO,
    Game,
    LobbyResponse,
    RulesResponse,
    PostFeedbackDTO,
)
from src.schemas import SuccessResponse


class GameService:
    async def create_game(self, data: CreateGameDTO, user: User) -> Game:
        pass

    async def join_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def leave_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def get_lobby(self, game_id: UUID, user: User) -> LobbyResponse:
        pass

    async def start_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def finish_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def get_rules(self, game_id: UUID, user: User) -> RulesResponse:
        pass

    async def get_game(self, game_id: UUID, user: User) -> Game:
        pass

    async def post_feedback(
        self, data: PostFeedbackDTO, game_id: UUID, user: User
    ) -> SuccessResponse:
        pass
