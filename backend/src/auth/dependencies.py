import asyncio

from fastapi import HTTPException, status

from src.auth.routes import AuthRouter
from src.auth.schemas import CheckTokenRequestSchema


async def verify_token(token: str) -> None:
    check_token = await AuthRouter.check_access_token(CheckTokenRequestSchema(token=token))
    if not check_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate Telegram ID and token"
        )
