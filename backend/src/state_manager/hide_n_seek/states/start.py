from datetime import datetime, timedelta
from random import sample

from src.games.hide_n_seek.schemas import HideNSeekData
from src.helpers.code_generator import generate_unique_codes
from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State

CODE_LENGTH = 6


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

        # calculate seeker size and check if there are no seekers or hiders
        seeker_size = int(data.seeker_percentage / 100) * len(game.lobby)
        seeker_size = max(seeker_size, 1)  # no seekers
        seeker_size = min(seeker_size, len(game.lobby) - 1)  # no hiders

        # distribute
        seekers = set() if len(game.lobby) < 2 else set(sample(game.lobby, seeker_size))
        hiders = set(game.lobby) - seekers

        # generate codes
        codes = generate_unique_codes(amount=len(hiders), length=CODE_LENGTH)

        # update data about teams
        data.hiders = {telegram_id: code for telegram_id, code in zip(hiders, codes)}

        game.data = data.model_dump()
        _ = await game.save()

        # go to new state
        await self.set_new_state(State.HIDING)
