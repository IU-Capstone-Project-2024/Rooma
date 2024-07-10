from uuid import UUID

from src.common.repository.feedback import FeedbackRepository
from src.common.repository.game import GameRepository
from src.common.repository.game_state import GameStateRepository
from src.common.repository.user import UserRepository
from src.common.schemas import PopularGameSchema
from src.database import User
from src.game_types.game_types import get_rules_by_game_type
from src.games.exceptions import GameForbiddenException
from src.games.schemas import (
    Game,
    LobbyResponse,
    RulesResponse,
    PostFeedbackDTO,
    Player,
    ListGamesResponse,
    GetAdminFeedback,
)
from src.schemas import SuccessResponse

game_repo = GameRepository()
game_state_repo = GameStateRepository()
user_repo = UserRepository()
feedback_repo = FeedbackRepository()


class GameService:
    async def list_games(self, user: User) -> list[ListGamesResponse]:
        response: list[ListGamesResponse] = []

        user_host = await game_repo.get_all_games_by_owner_id(user.telegram_id)
        response += [
            ListGamesResponse(game_id=game.game_id, is_host=True, is_active=game.is_active, name=game.name)
            for game in user_host
        ]

        user_participant = await game_repo.get_all_games_with_participant(user.telegram_id)
        response += [
            ListGamesResponse(game_id=game.game_id, is_host=False, is_active=game.is_active, name=game.name)
            for game in user_participant
        ]

        return response

    async def join_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.add_user_to_lobby(game_id, user.telegram_id)

        return SuccessResponse(success=True)

    async def leave_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.delete_user_from_lobby(game_id, user.telegram_id)

        return SuccessResponse(success=True)

    async def get_lobby(self, game_id: UUID, user: User) -> LobbyResponse:
        telegram_ids = await game_repo.get_all_telegram_ids_from_lobby(game_id)
        users = await user_repo.get_users_from_telegram_ids(telegram_ids)

        return LobbyResponse(lobby=[Player(**user.model_dump()) for user in users])

    async def start_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.set_active(game_id, is_active=True)

        return SuccessResponse(success=True)

    async def finish_game(self, game_id: UUID, user: User) -> SuccessResponse:
        await game_repo.set_active(game_id, is_active=False)

        return SuccessResponse(success=True)

    async def get_rules(self, game_id: UUID, user: User) -> RulesResponse:
        game = await game_repo.get_one_by_game_id(game_id)
        note = game.note
        rules = get_rules_by_game_type(game.game_type)
        return RulesResponse(note=note, rules=rules)

    async def get_game(self, game_id: UUID, user: User) -> Game:
        game = await game_repo.get_one_by_game_id(game_id)

        return Game(**game.model_dump())

    async def post_feedback(self, data: PostFeedbackDTO, user: User) -> SuccessResponse:
        await feedback_repo.create_one(data)

        return SuccessResponse(success=True)

    async def get_general_feedback(self, game_id: UUID, user: User) -> GetAdminFeedback:
        game = await game_repo.get_one_by_game_id(game_id)
        if user.telegram_id != game.owner_telegram_id:
            raise GameForbiddenException

        feedbacks = await feedback_repo.get_by_game_id(game_id)

        avg_score = 0 if len(feedbacks) == 0 else sum(feedback.score for feedback in feedbacks) / len(feedbacks)
        # TODO: PROCESS FEEDBACKS

        return GetAdminFeedback(avg_score=avg_score, feedback="Skibidi")

    async def get_popular(self, user: User) -> list[PopularGameSchema]:
        popular = await game_repo.get_games_amount_by_name()
        popular.sort(key=lambda x: x.count, reverse=True)

        return popular
