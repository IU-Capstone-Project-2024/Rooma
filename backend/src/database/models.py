from typing import Any
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field


class User(Document):
    telegram_id: int
    username: str
    first_name: str
    last_name: str


class Game(Document):
    game_id: UUID = Field(default_factory=uuid4)
    name: str
    data: Any
