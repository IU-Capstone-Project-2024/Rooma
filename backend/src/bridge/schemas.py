from typing import Any

from pydantic import BaseModel


class CreateGameSchema(BaseModel):
    name: str
    data: dict[str, Any]


class GetGameLinkResponseSchema(BaseModel):
    link: str
