from uuid import UUID

from beanie.operators import Eq

from src.database.models import Feedback
from src.database.repository.mongo import MongoBeanieRepository


class FeedbackRepository(MongoBeanieRepository):
    model = Feedback

    async def get_by_game_id(self, game_id: UUID) -> list[Feedback]:
        return await self.model.find(Eq(self.model.game_id, game_id)).to_list()
