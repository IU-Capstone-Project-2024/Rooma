from src.auth.service.get_token import GetTokenService
from src.auth.service.check_token import CheckTokenService

from src.auth.schemas import GetTokenResponseSchema, GetTokenRequestSchema, CheckTokenRequestSchema, \
    CheckTokenResponseSchema


class AuthRouter:
    @staticmethod
    async def get_token(body: GetTokenRequestSchema) -> GetTokenResponseSchema:
        token = await GetTokenService(body.telegram_id).get_token()

        return GetTokenResponseSchema(token=token)

    @staticmethod
    async def check_token(body: CheckTokenRequestSchema) -> CheckTokenResponseSchema:
        has_access = await CheckTokenService(body.token, body.telegram_id).check_token()

        return CheckTokenResponseSchema(has_access=has_access)
