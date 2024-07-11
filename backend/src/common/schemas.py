from uuid import UUID

from pydantic import BaseModel, Field


class ErrorSchema(BaseModel):
    message: str


class CreateGameStateSchema(BaseModel):
    game_id: UUID
    state: str


class PopularGameSchema(BaseModel):
    name: str = Field(..., alias="_id")
    count: int
