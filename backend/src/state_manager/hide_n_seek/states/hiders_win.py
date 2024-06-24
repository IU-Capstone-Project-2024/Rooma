from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler


class StateHandlerHidersWin(StateHandler):
    async def handle(self):
        log.info(f"State 'hiders win' of game with id = {self.game_id}")
