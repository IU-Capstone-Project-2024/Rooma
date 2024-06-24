from typing import Any
from uuid import UUID

from pydantic import BaseModel


class Player(BaseModel):
    telegram_id: int
    username: str | None = None
    first_name: str
    last_name: str | None = None


class Game(BaseModel):
    game_id: UUID
    owner_telegram_id: int
    name: str
    lobby: list[int]
    data: dict[str, Any]


class CreateGameDTO(BaseModel):
    name: str
    data: dict[str, Any]


class LobbyResponse(BaseModel):
    lobby: list[int]


class RulesResponse(BaseModel):
    rules: str
    note: str | None


class PostFeedbackDTO(BaseModel):
    # TODO: Fill it
    pass
