from typing import Any
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field


class User(Document):
    telegram_id: int
    username: str | None = None
    first_name: str
    last_name: str | None = None


class Game(Document):
    game_id: UUID = Field(default_factory=uuid4)
    name: str
    lobby: list[User] = Field(default_factory=list)
    data: Any


class RefreshToken(Document):
    value: str
    active: bool
