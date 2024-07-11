from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field


class Player(BaseModel):
    telegram_id: int
    username: str | None = None
    first_name: str
    last_name: str | None = None


class Game(BaseModel):
    game_id: UUID
    owner_telegram_id: int
    is_active: bool
    name: str
    lobby: list[int] = []
    data: dict[str, Any]


class ListGamesResponse(BaseModel):
    game_id: UUID
    is_host: bool
    is_active: bool
    name: str


class LobbyResponse(BaseModel):
    lobby: list[Player]


class RulesResponse(BaseModel):
    rules: str
    note: str | None


class PostFeedbackDTO(BaseModel):
    score: int = Field(..., ge=0, le=5)
    feedback: str | None


class PostFeedbackInner(BaseModel):
    game_id: UUID
    score: int
    feedback: str | None


class GetAdminFeedback(BaseModel):
    avg_score: float
    feedback: str
