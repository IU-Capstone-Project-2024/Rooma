from uuid import UUID

from src.common.repository.game import GameRepository
from src.common.repository.game_state import GameStateRepository
from src.common.repository.user import UserRepository
from src.database import User
from src.games.exceptions import GameForbiddenException, UserNotFoundException
from src.schemas import SuccessResponse

game_repo = GameRepository()
game_state_repo = GameStateRepository()
user_repo = UserRepository()


class GameService:
    async def find_hider(self, code: str, game_id: UUID, user: User) -> SuccessResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        if "hiders_found" not in game.data or "hiders" not in game.data:
            raise GameForbiddenException(game_id)

        for _code, _telegram_id in game.data["hiders"].items():
            if _code == code:
                game.data["hiders_found"].append(_telegram_id)
                _ = await game.save()
                break
        else:
            raise UserNotFoundException(code)

        return SuccessResponse(success=True)
