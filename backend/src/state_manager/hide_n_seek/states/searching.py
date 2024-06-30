from datetime import datetime

from src.games.hide_n_seek.schemas import HideNSeekData
from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State


class StateHandlerSearching(StateHandler):
    async def handle(self):
        log.info(f"State 'searching' of game with id = {self.game_id}")

        # fetch our game and check if it exists
        game = await self.get_current_game()
        if game is None:
            return

        # game is ended by foreign
        if game.is_active is False:
            await self.set_new_state(State.NO_WINNERS)
            return

        data = HideNSeekData(**game.data)

        # check if game ends by timeout
        current_time = datetime.utcnow()
        if current_time >= data.game_end_time:
            await self.set_new_state(State.HIDERS_WIN)
            return

        found_set = set(data.hiders_found)
        hiders_set = set(list(map(int, data.hiders.keys())))

        # no hiders
        if len(hiders_set - found_set) == 0:
            await self.set_new_state(State.SEEKERS_WIN)
            return
