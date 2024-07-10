from typing import Any
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field

from src.game_types.game_types import GameType


class User(Document):
    telegram_id: int
    username: str | None = None
    first_name: str
    last_name: str | None = None


class Game(Document):
    game_id: UUID = Field(default_factory=uuid4)
    game_type: GameType = GameType.HIDE_AND_SEEK
    owner_telegram_id: int
    name: str
    is_active: bool = False
    note: str | None = None
    lobby: list[int] = Field(default_factory=list)
    data: dict[str, Any]


class RefreshToken(Document):
    value: str
    active: bool


class GameState(Document):
    game_id: UUID
    state: str


class Feedback(Document):
    game_id: UUID
    score: int
    feedback: str | None
