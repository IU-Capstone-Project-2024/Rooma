import jwt

from src.auth.schemas.token_payload import TokenPayload
from src.auth.service.encode_decode_service.base_encoder import BaseEncoder
from src.vars.config import ACCESS_AUTH_SECRET


class AccessEncoder(BaseEncoder):

    def encode(self) -> str:
        return jwt.encode(
            payload=TokenPayload(telegram_id=self.telegram_id).model_dump(),
            key=ACCESS_AUTH_SECRET
        )
