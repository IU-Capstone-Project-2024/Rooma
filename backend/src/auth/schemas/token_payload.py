from typing import Optional

from pydantic import BaseModel


class TokenPayload(BaseModel):
    telegram_id: int
    random_value: Optional[str] = None
