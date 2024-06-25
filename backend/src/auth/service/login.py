from src.auth.service.encode_decode_service.access.access_encoder import AccessEncoder
from src.auth.service.encode_decode_service.refresh.refresh_decoder import RefreshDecoder
from src.database.models import RefreshToken


class LoginService:
    def __init__(self, refresh_token: str):
        self._refresh_token = refresh_token

    async def login(self) -> str:
        token_info = await RefreshToken.find_one(RefreshToken.value == self._refresh_token)

        if token_info is None or not token_info.active:
            raise ValueError()

        token_info.active = False
        await token_info.save()

        payload = RefreshDecoder(self._refresh_token).decode()
        return AccessEncoder(payload.telegram_id).encode()
