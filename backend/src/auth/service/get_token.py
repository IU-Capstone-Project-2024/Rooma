import jwt

from src.auth.config import SECRET


class GetTokenService:
    def __init__(self, telegram_id: int):
        """
        Service for creating token from user telegram id.

        Args:
            telegram_id: telegram_id of user.
        """
        self._telegram_id = telegram_id

    async def get_token(self) -> str:
        """
        generates token for current telegram_id.
        Returns: generated token.

        """
        token = jwt.encode(
            payload={"telegram_id": self._telegram_id},
            key=SECRET
        )

        return token
