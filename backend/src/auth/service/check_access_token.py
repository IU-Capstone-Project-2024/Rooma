from src.auth.schemas.token_payload import TokenPayload
from src.auth.service.encode_decode_service.access.access_decoder import AccessDecoder
from src.auth.exceptions import DecodeException


class CheckAccessTokenService:
    def __init__(self, token: str):
        """
        Service for checking authority of provided token.
        Args:
            token: token to check.
        """
        self._token = token

    def check_token(self) -> TokenPayload:
        """
        checks token and decode telegram_id of users from it.

        Returns:
            True if token is approved for the user. Else False.

        Raises:
            BadDecodedSchemaException: when decoded result does not contain telegram id.
        """
        try:
            decode_result = AccessDecoder(self._token).decode()
        except:
            raise DecodeException("somthing went bad during decoding.")

        return decode_result
