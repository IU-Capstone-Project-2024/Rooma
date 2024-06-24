from enum import StrEnum, auto


class State(StrEnum):
    DISTRIBUTE = auto()
    START = auto()
    HIDING = auto()
    SEARCHING = auto()
    HIDER_FOUND = auto()
    
    HIDERS_WIN = auto()
    SEEKERS_WIN = auto()
