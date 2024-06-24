from abc import ABC, abstractmethod


class BaseEncoder(ABC):
    def __init__(self, telegram_id: int):
        self.telegram_id = telegram_id

    @abstractmethod
    def encode(self) -> str: ...
