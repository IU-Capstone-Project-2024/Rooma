from typing import Any
from uuid import UUID

from pydantic import BaseModel


class CreateGameSchema(BaseModel):
    name: str
    data: Any


class CreateGameResponseSchema(BaseModel):
    game_id: UUID


class GetGameLinkSchema(BaseModel):
    game_id: UUID


class GetGameLinkResponseSchema(BaseModel):
    link: str
