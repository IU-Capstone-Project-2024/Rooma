from uuid import UUID

from beanie.operators import Eq, Set, NotIn

from src.database.models import GameState
from src.database.repository.mongo import MongoBeanieRepository


class GameStateRepository(MongoBeanieRepository):
    model = GameState

    async def get_by_game_id(self, game_id: UUID) -> GameState | None:
        return await self.model.find_one(Eq(self.model.game_id, game_id))

    async def get_not_in_states(self, state: list[str]) -> list[GameState]:
        return await self.model.find(NotIn(self.model.state, state)).to_list()

    async def get_by_state(self, state: str) -> list[GameState]:
        return await self.model.find(Eq(self.model.state, state)).to_list()

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
