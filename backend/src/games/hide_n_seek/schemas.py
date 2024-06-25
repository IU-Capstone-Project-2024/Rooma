from datetime import datetime

from pydantic import BaseModel

from src.games.schemas import Player


class HidersResponse(BaseModel):
    hiders: list[Player]


class EndTimesResponse(BaseModel):
    seeker_start_time: datetime
    game_end_time: datetime


class StateResponse(BaseModel):
    state: str
