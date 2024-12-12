from fastapi import APIRouter
from fastapi.exceptions import HTTPException

from src.auth.exceptions import DecodeException
from src.auth.schemas import (
    GetTokenResponseSchema,
    GetTokenRequestSchema,
    CheckTokenRequestSchema,
    LoginRequestSchema,
    LoginResponseSchema,
)
from src.auth.schemas.token_payload import TokenPayload
from src.auth.service.check_access_token import CheckAccessTokenService
from src.auth.service.encode_decode_service.refresh.refresh_encoder import (
    RefreshEncoder,
)
from src.auth.service.login import LoginService
from src.common.repository.user import UserRepository
from src.database import RefreshToken, User
from src.vars.config import TESTING

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

user_repository = UserRepository()


@auth_router.post("/login", response_model=LoginResponseSchema)
async def login(body: LoginRequestSchema):
    try:
        access_token = await LoginService(body.refresh_token).login()
    except ValueError:
        raise HTTPException(403)

    return LoginResponseSchema(access_token=access_token)


@auth_router.post("/generate_user/{telegram_id}")
async def generate_user(telegram_id: int):
    if not TESTING:
        raise HTTPException(403)

    user = await user_repository.get_user(telegram_id)
    if user is None:
        await user_repository.create_one(
            User(
                telegram_id=telegram_id,
                username=f"username_{telegram_id}",
                first_name=f"first_name_{telegram_id}",
                last_name=f"last_name_{telegram_id}",
            )
        )

    return {"success": True}


class AuthRouter:
    @staticmethod
    async def get_refresh_token(body: GetTokenRequestSchema) -> GetTokenResponseSchema:
        token = RefreshEncoder(body.telegram_id).encode()
        await RefreshToken(value=token, active=True).create()

        return GetTokenResponseSchema(token=token)

    @staticmethod
    async def check_access_token(body: CheckTokenRequestSchema) -> TokenPayload | bool:
        if TESTING:
            try:
                return TokenPayload(telegram_id=int(body.token))
            except:
                return TokenPayload(telegram_id=1)

        try:
            return CheckAccessTokenService(body.token).check_token()
        except DecodeException:
            return False
