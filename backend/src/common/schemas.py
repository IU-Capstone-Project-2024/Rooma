from uuid import UUID

from pydantic import BaseModel


class ErrorSchema(BaseModel):
    message: str


class CreateGameStateSchema(BaseModel):
    game_id: UUID
    state: str
