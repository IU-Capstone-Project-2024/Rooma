from random import sample

from src.helpers.code_generator import generate_unique_codes
from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler
from src.state_manager.hide_n_seek.state import State

MIN_TO_START = 2
CODE_LENGTH = 6


class StateHandlerDistribute(StateHandler):
    async def handle(self):
        game = await self.get_current_game()
        if game is None:
            log.error(f"Cannot find game with id = {self.game_id}")
            return

        seeker_percentage = game.data.get("seeker_percentage")
        if seeker_percentage is None:
            log.error(f"Seeker percentage is not present in game with id = {self.game_id}")
            return

        if len(game.lobby) < MIN_TO_START:
            log.error(f"Not enough people to distribute in game with id = {self.game_id}")
            return

        seeker_size = int(seeker_percentage / 100) * len(game.lobby)
        if seeker_size == 0:  # no seekers
            seeker_size = 1
        elif seeker_size == len(game.lobby):  # no hiders
            seeker_size = len(game.lobby) - 1

        seekers = set(sample(game.lobby, seeker_size))
        hiders = set(game.lobby) - seekers

        codes = generate_unique_codes(amount=len(hiders), length=CODE_LENGTH)

        game.data["hiders"] = {user.telegram_id: code for user, code in zip(hiders, codes)}

        _ = await game.save()

        await self.set_new_state(State.START)
