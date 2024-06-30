from uuid import UUID

from src.common.repository.game import GameRepository
from src.common.repository.game_state import GameStateRepository
from src.common.repository.user import UserRepository
from src.database import User
from src.games.exceptions import GameForbiddenException, UserNotFoundException, GameNotFoundException
from src.games.hide_n_seek.schemas import (
    HidersResponse,
    EndTimesResponse,
    StateResponse,
    DurationsResponse,
    CreateHideNSeekRequest, HideNSeekData
)
from src.games.schemas import Player, Game
from src.logs.log import log
from src.schemas import SuccessResponse

game_repo = GameRepository()
game_state_repo = GameStateRepository()
user_repo = UserRepository()


class GameService:
    async def create_game(self, data: CreateHideNSeekRequest, user: User) -> Game:
        data.owner_telegram_id = user.telegram_id

        created = await game_repo.create_one(data)
        log.info(f"Create game with id = {created.game_id}")

        return Game(**created.model_dump())

    async def find_hider(self, code: str, game_id: UUID, user: User) -> SuccessResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        if not game.is_active:
            raise GameForbiddenException(game_id)

        data = HideNSeekData(**game.data)

        if user.telegram_id in data.hiders.keys():
            raise GameForbiddenException(game_id)

        for _telegram_id, _code in data.hiders.items():
            if _code == code:
                if _telegram_id not in data.hiders:
                    game.data["hiders_found"].append(telegram_id)
                    _ = await game.save()
                    break
        else:
            raise UserNotFoundException(code)

        return SuccessResponse(success=True)

    async def get_hiders(self, game_id: UUID, user: User) -> HidersResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        if "hiders" not in game.data:
            raise GameForbiddenException(game_id)

        telegram_ids = list(map(int, game.data["hiders"].keys()))
        users = await user_repo.get_users_from_telegram_ids(telegram_ids)
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

    async def get_durations(self, game_id: UUID, user: User) -> DurationsResponse:
        game = await game_repo.get_one_by_game_id(game_id)

        return DurationsResponse(
            duration=game.data["duration"],
            time_to_hide=game.data["time_to_hide"]
        )

    async def get_state(self, game_id: UUID, user: User) -> StateResponse:
        state = await game_state_repo.get_state_by_game_id(game_id)
        if state is None:
            raise GameNotFoundException(game_id)

        return StateResponse(state=state)
