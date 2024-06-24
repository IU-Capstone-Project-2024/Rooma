from fastapi import HTTPException, status, Depends

from src.auth.routes import AuthRouter
from src.auth.schemas import CheckTokenRequestSchema
from src.common.repository.user import UserRepository
from src.database import User

user_repo = UserRepository()


async def verify_token(token: str) -> int:
    check_token = await AuthRouter.check_access_token(CheckTokenRequestSchema(token=token))
    if not check_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate Telegram ID and token"
        )

    return check_token.telegram_id


async def get_user(telegram_id: int = Depends(verify_token)) -> User:
    user = await user_repo.get_user(telegram_id=telegram_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate Telegram ID and token"
        )

    return user
