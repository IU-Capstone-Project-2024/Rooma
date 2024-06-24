from pydantic import BaseModel


class TokenPayload(BaseModel):
    telegram_id: int
