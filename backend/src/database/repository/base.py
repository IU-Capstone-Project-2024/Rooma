from abc import ABC, abstractmethod


class AbstractBaseRepository(ABC):
    @abstractmethod
    async def get_all(self, skip, limit):
        ...

    @abstractmethod
    async def get_one_by_id(self, _id):
        ...

    @abstractmethod
    async def delete_one(self, _id):
        ...

    @abstractmethod
    async def create_one(self, data):
        ...

    @abstractmethod
    async def update_one(self, data, _id):
        ...
