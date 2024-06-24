from uuid import UUID

from src.common.repository.game import GameRepository
from src.database import User
from src.games.exceptions import GameNotFoundException
from src.games.schemas import (
    CreateGameDTO,
    Game,
    LobbyResponse,
    RulesResponse,
    PostFeedbackDTO,
)
from src.logs.log import log
from src.schemas import SuccessResponse

game_repo = GameRepository()


class GameService:
    async def create_game(self, data: CreateGameDTO, user: User) -> Game:
        data.owner_telegram_id = user.telegram_id

        created = await game_repo.create_one(data)
        log.info(f"Create game with id = {created.game_id}")

        return Game(**created.model_dump())

    async def join_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def leave_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def get_lobby(self, game_id: UUID, user: User) -> LobbyResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        if game is None:
            raise GameNotFoundException(game_id)

        return LobbyResponse(lobby=game.lobby)

    async def start_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def finish_game(self, game_id: UUID, user: User) -> SuccessResponse:
        pass

    async def get_rules(self, game_id: UUID, user: User) -> RulesResponse:
        pass

    async def get_game(self, game_id: UUID, user: User) -> Game:
        game = await game_repo.get_one_by_game_id(game_id)
        if game is None:
            raise GameNotFoundException(game_id)

        return Game(**game.model_dump())

    async def post_feedback(
            self, data: PostFeedbackDTO, game_id: UUID, user: User
    ) -> SuccessResponse:
        pass
