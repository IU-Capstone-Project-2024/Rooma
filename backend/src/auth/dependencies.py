from fastapi import HTTPException, status

from src.auth.routes import AuthRouter
from src.auth.schemas import CheckTokenRequestSchema


async def verify_token(token: str, telegram_id: int) -> None:
    check_token = await AuthRouter.check_token(CheckTokenRequestSchema(token=token, telegram_id=telegram_id))
    if not check_token.has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate Telegram ID and token"
        )
