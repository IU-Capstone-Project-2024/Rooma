from uuid import UUID

from beanie.operators import Eq, Set

from src.database.models import GameState
from src.database.repository.mongo import MongoBeanieRepository


class GameStateRepository(MongoBeanieRepository):
    model = GameState

    async def get_by_game_id(self, game_id: UUID) -> GameState | None:
        return await self.model.find_one(Eq(self.model.game_id, game_id))

    async def get_state_by_game_id(self, game_id: UUID) -> str | None:
        game_state = await self.get_by_game_id(game_id)
        if game_state is None:
            return None

        return game_state.state

    async def set_state_by_game_id(self, game_id: UUID, state: str):
        game_state = await self.get_by_game_id(game_id)
        if game_state is None:
            return

        await game_state.update(Set({self.model.state: state}))
