from datetime import datetime

from src.common.repository.game import GameRepository
from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State

game_repo = GameRepository()


class StateHandlerSearching(StateHandler):
    async def handle(self):
        log.info(f"State 'searching' of game with id = {self.game_id}")

        # fetch our game and check if it exists
        game = await self.get_current_game()
        if game is None:
            return

        # get game end time and check that it exists in data
        game_end_time = game.data.get("game_end_time")
        if game_end_time is None:
            log.error(f"Game end time is not present in game with id = {self.game_id}")
            return

        # game is ended by foreign
        if game.is_active is False:
            await self.set_new_state(State.NO_WINNERS)
            return

        # check if game ends by timeout
        current_time = datetime.utcnow()
        if current_time >= game_end_time:
            await self.set_new_state(State.HIDERS_WIN)
            await game_repo.set_active(self.game_id, is_active=False)
            return

        found_set = set(game.data.get("hiders_found", []))
        hiders_set = set(game.data.get("hiders", dict()).keys())

        # no hiders
        if len(hiders_set - found_set) == 0:
            await self.set_new_state(State.SEEKERS_WIN)
            await game_repo.set_active(self.game_id, is_active=False)
            return
