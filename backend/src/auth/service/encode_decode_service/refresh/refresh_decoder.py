import jwt

from src.auth.schemas.token_payload import TokenPayload
from src.auth.service.encode_decode_service.base_decoder import BaseDecoder
from src.vars.config import REFRESH_AUTH_SECRET


class RefreshDecoder(BaseDecoder):
    def decode(self):
        return TokenPayload(**jwt.decode(jwt=self.token, key=REFRESH_AUTH_SECRET, algorithms=["HS256"]))
