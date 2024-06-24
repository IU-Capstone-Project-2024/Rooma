from datetime import datetime

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

        # get seeker start time and check that it exists in data
        seeker_start_time = game.data.get("seeker_start_time")
        if seeker_start_time is None:
            log.error(f"Seeker start time is not present in game with id = {self.game_id}")
            return

        # check if seekers can start
        current_time = datetime.utcnow()
        if current_time < seeker_start_time:
            return

        game.data["hiders_found"] = []
        _ = await game.save()

        # go to a new state
        await self.set_new_state(State.SEARCHING)
