from fastapi import APIRouter
from fastapi.exceptions import HTTPException

from src.auth.exceptions import DecodeException
from src.auth.schemas.token_payload import TokenPayload
from src.auth.service.check_access_token import CheckAccessTokenService

from src.auth.schemas import GetTokenResponseSchema, GetTokenRequestSchema, CheckTokenRequestSchema, LoginRequestSchema, \
    LoginResponseSchema
from src.auth.service.encode_decode_service.refresh.refresh_encoder import RefreshEncoder
from src.auth.service.login import LoginService
from src.database import RefreshToken

auth_router = APIRouter(prefix="/auth", tags=["Auth"])


@auth_router.post("/login", response_model=LoginResponseSchema)
async def login(body: LoginRequestSchema):
    try:
        access_token = await LoginService(body.refresh_token).login()
    except ValueError:
        raise HTTPException(403)

    return LoginResponseSchema(access_token=access_token)


class AuthRouter:
    @staticmethod
    async def get_refresh_token(body: GetTokenRequestSchema) -> GetTokenResponseSchema:
        token = RefreshEncoder(body.telegram_id).encode()
        await RefreshToken(value=token, active=True).create()

        return GetTokenResponseSchema(token=token)

    @staticmethod
    async def check_access_token(body: CheckTokenRequestSchema) -> TokenPayload | bool:
        try:
            return CheckAccessTokenService(body.token).check_token()
        except DecodeException:
            return False
