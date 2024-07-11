from beanie.operators import In, Eq

from src.database.models import User
from src.database.repository.mongo import MongoBeanieRepository


class UserRepository(MongoBeanieRepository):
    model = User

    async def get_user(self, telegram_id: int) -> User | None:
        return await self.model.find_one(Eq(self.model.telegram_id, telegram_id))

    async def get_users_from_telegram_ids(self, telegram_ids: list[int]) -> list[User]:
        return await self.model.find(In(self.model.telegram_id, telegram_ids)).to_list()
