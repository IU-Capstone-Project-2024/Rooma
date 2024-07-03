from datetime import datetime
from typing import Self

from pydantic import BaseModel, Field, model_validator

from src.games.schemas import Player


class HideNSeekCreateData(BaseModel):
    seeker_percentage: int = Field(..., ge=0, le=100)
    duration: int = Field(..., ge=0)  # minutes
    time_to_hide: int = Field(..., ge=0)  # minutes

    @model_validator(mode='after')
    def check_passwords_match(self) -> Self:
        if self.time_to_hide >= self.duration:
            raise ValueError("Time to hide cannot be larger than duration of the game")
        return self


class HiderFoundData(BaseModel):
    hider_tid: int
    seeker_tid: int
    found_time: datetime


class HideNSeekData(HideNSeekCreateData):
    # set by backend
    hiders: dict[int, str] = {}  # dict[telegram_id, code]
    hiders_found: list[HiderFoundData] = []
    seeker_start_time: datetime | None = None
    game_end_time: datetime | None = None


class CreateHideNSeekRequest(BaseModel):
    name: str
    data: HideNSeekCreateData
    note: str | None = None

    # set by backend
    owner_telegram_id: int | None = None


class HidersResponse(BaseModel):
    hiders: list[Player]


class EndTimesResponse(BaseModel):
    seeker_start_time: datetime | None
    game_end_time: datetime | None


class DurationsResponse(BaseModel):
    duration: int
    time_to_hide: int


class StateResponse(BaseModel):
    state: str


class HidersResultsResponse(BaseModel):
    telegram_id: int
    name: str
    found_time: int | None


class SeekersResultsResponse(BaseModel):
    telegram_id: int
    name: str
    found: int


class HiderCodeResponse(BaseModel):
    code: str
