from uuid import UUID

from src.common.repository.game import GameRepository
from src.common.repository.game_state import GameStateRepository
from src.common.repository.user import UserRepository
from src.database import User
from src.games.exceptions import GameForbiddenException, UserNotFoundException, GameNotFoundException
from src.games.hide_n_seek.schemas import HidersResponse, EndTimesResponse, StateResponse
from src.games.schemas import Player
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

    async def get_hiders(self, game_id: UUID, user: User) -> HidersResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        if "hiders" not in game.data:
            raise GameForbiddenException(game_id)

        users = await user_repo.get_users_from_telegram_ids(game.data["hiders"].keys())
        hiders = [Player(**user.model_dump()) for user in users]

        return HidersResponse(hiders=hiders)

    async def get_end_time(self, game_id: UUID, user: User) -> EndTimesResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        if "seeker_start_time" not in game.data or "game_end_time" not in game.data:
            raise GameForbiddenException(game_id)

        return EndTimesResponse(
            seeker_start_time=game.data["seeker_start_time"],
            game_end_time=game.data["game_end_time"]
        )

    async def get_state(self, game_id: UUID, user: User) -> StateResponse:
        state = await game_state_repo.get_state_by_game_id(game_id)
        if state is None:
            raise GameNotFoundException(game_id)

        return StateResponse(state=state)
