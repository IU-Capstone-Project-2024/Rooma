from src.database.models import User
from src.database.repository.mongo import MongoBeanieRepository


class UserRepository(MongoBeanieRepository):
    model = User

    async def get_user(self, telegram_id: int) -> User | None:
        return await self.model.find_one(self.model.telegram_id == telegram_id)
