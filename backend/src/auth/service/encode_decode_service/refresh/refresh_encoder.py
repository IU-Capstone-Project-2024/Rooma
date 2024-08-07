import jwt

from datetime import datetime

from src.auth.schemas.token_payload import TokenPayload
from src.auth.service.encode_decode_service.base_encoder import BaseEncoder
from src.vars.config import REFRESH_AUTH_SECRET


class RefreshEncoder(BaseEncoder):
    def encode(self) -> str:
        return jwt.encode(
            payload=TokenPayload(
                telegram_id=self.telegram_id,
                random_value=str(datetime.utcnow().timestamp())
            ).model_dump(),
            key=REFRESH_AUTH_SECRET
        )
