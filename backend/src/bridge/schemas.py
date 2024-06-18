from typing import Any

from pydantic import BaseModel


class CreateGameSchema(BaseModel):
    name: str
    data: Any


class GetGameLinkResponseSchema(BaseModel):
    link: str
