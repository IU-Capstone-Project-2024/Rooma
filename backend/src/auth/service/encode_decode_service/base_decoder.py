from abc import ABC, abstractmethod

from src.auth.schemas.token_payload import TokenPayload


class BaseDecoder(ABC):
    def __init__(self, token: str):
        self.token = token

    @abstractmethod
    def decode(self) -> TokenPayload: ...
