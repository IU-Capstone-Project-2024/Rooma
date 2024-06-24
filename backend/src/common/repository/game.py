from uuid import UUID

from beanie.operators import Eq

from src.database.models import Game
from src.database.repository.mongo import MongoBeanieRepository
from src.games.exceptions import GameNotFoundException, CannotAddToLobbyException


class GameRepository(MongoBeanieRepository):
    model = Game

    async def get_one_by_game_id(self, game_id: UUID) -> Game | None:
        return await self.model.find_one({"game_id": game_id})

    async def add_user_to_lobby(self, game_id: UUID, telegram_id: int):
        game = await self.get_one_by_game_id(game_id)
        if not game:
            raise GameNotFoundException(game_id)

        if telegram_id in game.lobby:
            raise CannotAddToLobbyException(game_id)

        game.lobby.append(telegram_id)
        _ = await game.save()

        return True

    async def get_all_telegram_ids_from_lobby(self, game_id: UUID) -> list[int]:
        game = await self.get_one_by_game_id(game_id)
        if not game:
            raise GameNotFoundException(game_id)

        return game.lobby

    async def get_all_active(self) -> list[Game]:
        return await self.model.find(Eq(Game.is_active, True)).to_list()
