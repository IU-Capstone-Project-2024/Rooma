from datetime import datetime, timedelta

from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State


class StateHandlerStart(StateHandler):
    async def handle(self):
        log.info(f"State 'start' of game with id = {self.game_id}")

        # fetch our game and check if it exists
        game = await self.get_current_game()
        if game is None:
            log.error(f"Cannot find game with id = {self.game_id}")
            return

        # get duration and check that it exists in data
        duration = game.data.get("duration")
        if duration is None:
            log.error(f"Duration is not present in game with id = {self.game_id}")
            return

        # get time to hide and check that it exists in data
        time_to_hide = game.data.get("time_to_hide")
        if time_to_hide is None:
            log.error(f"Time to hide is not present in game with id = {self.game_id}")
            return

        # game ends before seekers start
        if time_to_hide >= duration:
            log.error(f"Hiding takes more time than duration in game with id = {self.game_id}")
            return

        # calculate finish times
        current_time = datetime.utcnow()
        seeker_start_time = current_time + timedelta(minutes=time_to_hide)
        game_end_time = current_time + timedelta(minutes=duration)

        # save end times
        game.data["seeker_start_time"] = seeker_start_time
        game.data["game_end_time"] = game_end_time
        _ = await game.save()

        # go to new state
        await self.set_new_state(State.HIDING)
