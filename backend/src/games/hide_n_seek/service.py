from datetime import datetime, UTC
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
    CreateHideNSeekRequest,
    HideNSeekData,
    HiderFoundData,
    HidersResultsResponse,
    SeekersResultsResponse,
    HiderCodeResponse
)
from src.games.schemas import Player, Game
from src.logs.log import log
from src.schemas import SuccessResponse
from src.state_manager.hide_n_seek.state import State

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
        # ensure that game is running
        game = await game_repo.get_one_by_game_id(game_id)
        if not game.is_active:
            raise GameForbiddenException(game_id)

        # ensure that seekers are searching
        game_state = await game_state_repo.get_state_by_game_id(game_id=game.game_id)
        if game_state != State.SEARCHING:
            raise GameForbiddenException(game_id)

        data = HideNSeekData(**game.data)

        # ensure that requested user is seeker
        if user.telegram_id in data.hiders.keys():
            raise GameForbiddenException(game_id)

        # ensure that hider with the given code exists
        hider_tid = next((k for k, v in data.hiders.items() if v == code), None)
        if hider_tid is None:
            raise UserNotFoundException(code)

        # ensure that we did not find the hider before
        if all(hider_data.hider_tid != hider_tid for hider_data in data.hiders_found):
            data.hiders_found.append(
                HiderFoundData(
                    hider_tid=hider_tid,
                    seeker_tid=user.telegram_id,
                    found_time=datetime.now(UTC)
                )
            )

            game.data = data.model_dump()
            _ = await game.save()
        else:
            raise GameForbiddenException(code)

        return SuccessResponse(success=True)

    async def get_hiders(self, game_id: UUID, user: User) -> HidersResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        data = HideNSeekData(**game.data)

        telegram_ids = list(map(int, data.hiders.keys()))
        users = await user_repo.get_users_from_telegram_ids(telegram_ids)
        hiders = [Player(**user.model_dump()) for user in users]

        return HidersResponse(hiders=hiders)

    async def get_end_time(self, game_id: UUID, user: User) -> EndTimesResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        data = HideNSeekData(**game.data)

        return EndTimesResponse(
            seeker_start_time=data.seeker_start_time,
            game_end_time=data.game_end_time
        )

    async def get_durations(self, game_id: UUID, user: User) -> DurationsResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        data = HideNSeekData(**game.data)

        return DurationsResponse(
            duration=data.duration,
            time_to_hide=data.time_to_hide
        )

    async def get_state(self, game_id: UUID, user: User) -> StateResponse:
        state = await game_state_repo.get_state_by_game_id(game_id)
        if state is None:
            raise GameNotFoundException(game_id)

        return StateResponse(state=state)

    async def get_hider_results(self, game_id: UUID, user: User) -> list[HidersResultsResponse]:
        game = await game_repo.get_one_by_game_id(game_id)
        data = HideNSeekData(**game.data)

        response_dict: dict[int, HidersResultsResponse] = {}
        for hider_tid in data.hiders.keys():
            user = await user_repo.get_user(hider_tid)
            response_dict[hider_tid] = HidersResultsResponse(
                telegram_id=hider_tid,
                name=user.first_name,
                found_time=None
            )

        for hider_data in data.hiders_found:
            response_dict[hider_data.hider_tid].found_time = (
                    (hider_data.found_time - data.seeker_start_time).total_seconds() // 60
            )

        response: list[HidersResultsResponse] = list(response_dict.values())

        # not found first
        response.sort(key=lambda x: x.found_time if x.found_time is not None else float("inf"), reverse=True)

        return response

    async def get_seeker_results(self, game_id: UUID, user: User) -> list[SeekersResultsResponse]:
        game = await game_repo.get_one_by_game_id(game_id)
        data = HideNSeekData(**game.data)

        seeker_found_dict: dict[int, int] = {seeker_tid: 0 for seeker_tid in set(game.lobby) - set(data.hiders.keys())}
        for hider_data in data.hiders_found:
            seeker_found_dict[hider_data.seeker_tid] += 1

        response: list[SeekersResultsResponse] = []
        for seeker_tid, found in seeker_found_dict.items():
            user = await user_repo.get_user(seeker_tid)
            response.append(
                SeekersResultsResponse(
                    telegram_id=seeker_tid,
                    name=user.first_name,
                    found=found
                )
            )

        response.sort(key=lambda x: x.found, reverse=True)

        return response

    async def get_hider_code(self, game_id: UUID, user: User) -> HiderCodeResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        data = HideNSeekData(**game.data)

        if user.telegram_id not in data.hiders:
            raise UserNotFoundException(user_id=user.telegram_id)

        return HiderCodeResponse(code=data.hiders[user.telegram_id])
