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
    owner_telegram_id: int
    name: str
    is_active: bool = False
    lobby: list[int] = Field(default_factory=list)
    data: dict[str, Any]


class RefreshToken(Document):
    value: str
    active: bool

      
class GameState(Document):
    game_id: UUID
    state: str
