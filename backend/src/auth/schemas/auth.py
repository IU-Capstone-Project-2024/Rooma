from pydantic import BaseModel


class GetTokenRequestSchema(BaseModel):
    telegram_id: int


class GetTokenResponseSchema(BaseModel):
    token: str


class CheckTokenRequestSchema(BaseModel):
    token: str


class LoginRequestSchema(BaseModel):
    refresh_token: str


class LoginResponseSchema(BaseModel):
    access_token: str
