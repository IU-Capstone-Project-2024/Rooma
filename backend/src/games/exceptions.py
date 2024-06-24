from src.exceptions import NotFoundException, ForbiddenException, BadRequestException


class GameNotFoundException(NotFoundException):
    def __init__(self, game_id):
        self.id = game_id
        super().__init__(f"Game with id {game_id} not found")


class UserNotFoundException(NotFoundException):
    def __init__(self, user_id):
        self.id = user_id
        super().__init__(f"User with id {user_id} not found")


class GameForbiddenException(ForbiddenException):
    def __init__(self, game_id):
        self.id = game_id
        super().__init__(f"You do not have access to budget with id {game_id}")


class CannotAddToLobbyException(BadRequestException):
    def __init__(self, game_id):
        self.id = game_id
        super().__init__(f"Cannot add user to lobby of game with id {game_id}")
