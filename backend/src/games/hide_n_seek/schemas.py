from datetime import datetime

from pydantic import BaseModel, Field

from src.games.schemas import Player


class HideNSeekData(BaseModel):
    seeker_percentage: int = Field(..., ge=0, le=100)
    duration: int = Field(..., ge=0)  # minutes
    time_to_hide: int = Field(..., ge=0)  # minutes

    # set by backend
    hiders: dict[int, str] | None = None  # dict[telegram_id, code]
    hiders_found: list[int] | None = None  # list[telegram_id]
    seeker_start_time: datetime | None = None
    game_end_time: datetime | None = None


class CreateHideNSeekRequest(BaseModel):
    name: str
    data: HideNSeekData

    # set by backend
    owner_telegram_id: int | None = None


class HidersResponse(BaseModel):
    hiders: list[Player]


class EndTimesResponse(BaseModel):
    seeker_start_time: datetime
    game_end_time: datetime


class DurationsResponse(BaseModel):
    duration: int
    time_to_hide: int


class StateResponse(BaseModel):
    state: str
