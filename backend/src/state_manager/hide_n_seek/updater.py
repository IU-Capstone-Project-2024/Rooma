import asyncio

from src.common.repository.game import GameRepository
from src.common.repository.game_state import GameStateRepository
from src.database import init_db
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State

SLEEP_TIME = 5  # seconds
game_repo = GameRepository()
game_state_repo = GameStateRepository()


async def update_all():
    games = set(game.game_id for game in await game_repo.get_all_active())
    game_states = set(
        game_state.game_id for game_state in
        await game_state_repo.get_not_in_states([State.HIDERS_WIN, State.SEEKERS_WIN, State.NO_WINNERS])
    )

    for game_id in games | game_states:
        handler = StateHandler(game_id=game_id)
        await handler.handle_current_state()


async def run():
    await init_db()

    while True:
        await update_all()
        await asyncio.sleep(SLEEP_TIME)


if __name__ == "__main__":
    asyncio.run(run())
