from enum import StrEnum, auto


class State(StrEnum):
    START = auto()
    HIDING = auto()
    SEARCHING = auto()
    HIDER_FOUND = auto()

    HIDERS_WIN = auto()
    SEEKERS_WIN = auto()
    NO_WINNERS = auto()
