from enum import Enum


class GameType(Enum):
    HIDE_AND_SEEK = "hide_and_seek"


RULES = {
    GameType.HIDE_AND_SEEK: "Players will be automatically divided into those who are seeking and those who are hiding. After the host started the game, their role appeared on the players’ screens. Those who are hiding will have their own unique code, which will need to be said if the player is found. Accordingly, the seeking player, having found the player, must find out the code and enter it in the phone so that the found person is counted."
}


def get_rules_by_game_type(game_type: GameType) -> str:
    return RULES[game_type]
