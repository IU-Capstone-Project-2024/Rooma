import asyncio

from src.common.repository.game import GameRepository
from src.database import init_db
from src.state_manager.hide_n_seek.handler import StateHandler

SLEEP_TIME = 5  # seconds
game_repo = GameRepository()


async def update_all():
    games = await game_repo.get_all_active()

    for game in games:
        handler = StateHandler(game_id=game.game_id)
        await handler.handle_current_state()


async def run():
    await init_db()

    while True:
        await update_all()
        await asyncio.sleep(SLEEP_TIME)


if __name__ == "__main__":
    asyncio.run(run())
