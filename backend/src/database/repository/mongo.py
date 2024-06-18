from typing import TypeVar

from app.database.repository.base import AbstractBaseRepository
from beanie import Document, BeanieObjectId
from pydantic import BaseModel

T = TypeVar("T", bound=Document)


class MongoBeanieRepository(AbstractBaseRepository):
    model = Document

    async def get_all(self, skip: int | None = None, limit: int | None = None) -> list[T]:
        return await self.model.find_all(skip=skip, limit=limit).to_list()

    async def get_one_by_id(self, _id: BeanieObjectId) -> T | None:
        return await self.model.find_one(self.model.id == _id)

    async def delete_one(self, _id: BeanieObjectId) -> None:
        await self.model.find_one(self.model.id == _id).delete()

    async def create_one(self, data: BaseModel) -> T:
        new_data = self.model(**data.model_dump())
        await new_data.create()

        return new_data

    async def insert_many(self, data: list[T]) -> None:
        await self.model.insert_many(data)

    async def update_one(self, data: BaseModel, _id: BeanieObjectId) -> T | None:
        existing_data = await self.get_one_by_id(_id)

        if existing_data:
            await existing_data.update({"$set": data.model_dump(exclude_unset=True)})

            return existing_data
