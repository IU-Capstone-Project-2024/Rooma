from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler


class StateHandlerNoWinners(StateHandler):
    async def handle(self):
        log.info(f"State 'no winners' of game with id = {self.game_id}")
