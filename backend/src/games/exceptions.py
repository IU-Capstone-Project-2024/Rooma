from src.exceptions import NotFoundException, ForbiddenException


class GameNotFoundException(NotFoundException):
    def __init__(self, game_id):
        self.id = game_id
        super().__init__(f"Game with id {game_id} not found")


class GameForbiddenException(ForbiddenException):
    def __init__(self, game_id):
        self.id = game_id
        super().__init__(f"You do not have access to budget with id {game_id}")
