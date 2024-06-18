import jwt

from src.auth.config import SECRET
from src.auth.exceptions import BadDecodedSchemaException, DecodeException


class CheckTokenService:
    def __init__(self, token: str, telegram_id: int):
        """
        Service for checking authority of provided token.
        Args:
            token: token to check.
            telegram_id: telegram id of user to check token.
        """
        self._telegram_id = telegram_id
        self._token = token

    async def check_token(self) -> bool:
        """
        checks token and decode telegram_id of users from it.

        Returns:
            True if token is approved for the user. Else False.

        Raises:
            BadDecodedSchemaException: when decoded result does not contain telegram id.
        """
        try:
            decode_result = jwt.decode(
                jwt=self._token,
                key=SECRET,
                algorithms=["HS256"]
            )
        except:
            raise DecodeException("somthing went bad during decoding.")

        if "telegram_id" not in decode_result:
            raise BadDecodedSchemaException("Bad schema after decoding")

        return decode_result["telegram_id"] == self._telegram_id
