from datetime import datetime

from src.games.hide_n_seek.schemas import HideNSeekData
from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State


class StateHandlerHiding(StateHandler):
    async def handle(self):
        log.info(f"State 'hiding' of game with id = {self.game_id}")

        # fetch our game and check if it exists
        game = await self.get_current_game()
        if game is None:
            return
        # game is ended by foreign
        if game.is_active is False:
            await self.set_new_state(State.NO_WINNERS)
            return

        data = HideNSeekData(**game.data)

        # check if seekers can start
        current_time = datetime.utcnow()
        if current_time < data.seeker_start_time:
            return

        data.hiders_found = []

        game.data = data.model_dump()
        _ = await game.save()

        # go to a new state
        await self.set_new_state(State.SEARCHING)
