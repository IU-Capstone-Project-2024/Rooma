from uuid import UUID

from beanie.operators import Eq, Set

from src.database.models import GameState
from src.database.repository.mongo import MongoBeanieRepository


class GameStateRepository(MongoBeanieRepository):
    model = GameState

    async def get_by_game_id(self, game_id: UUID) -> GameState | None:
        return await self.model.find_one(Eq(self.model.game_id, game_id))

    async def set_state_by_game_id(self, game_id: UUID, state: str):
        game_state = await self.get_by_game_id(game_id)
        await game_state.update(Set({self.model.state: state}))
