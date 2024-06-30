from datetime import datetime, timedelta

from src.games.hide_n_seek.schemas import HideNSeekData
from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State


class StateHandlerStart(StateHandler):
    async def handle(self):
        log.info(f"State 'start' of game with id = {self.game_id}")

        # fetch our game and check if it exists
        game = await self.get_current_game()
        if game is None:
            return

        data = HideNSeekData(**game.data)

        # calculate finish times
        current_time = datetime.utcnow()
        seeker_start_time = current_time + timedelta(minutes=data.time_to_hide)
        game_end_time = current_time + timedelta(minutes=data.duration)

        # save end times
        data.seeker_start_time = seeker_start_time
        data.game_end_time = game_end_time

        game.data = data.model_dump()
        _ = await game.save()

        # go to new state
        await self.set_new_state(State.HIDING)
