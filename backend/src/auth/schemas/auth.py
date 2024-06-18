from pydantic import BaseModel


class GetTokenRequestSchema(BaseModel):
    telegram_id: int


class GetTokenResponseSchema(BaseModel):
    token: str


class CheckTokenRequestSchema(BaseModel):
    token: str
    telegram_id: int


class CheckTokenResponseSchema(BaseModel):
    has_access: bool
