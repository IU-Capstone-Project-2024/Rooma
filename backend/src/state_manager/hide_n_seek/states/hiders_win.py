from src.common.repository.game import GameRepository
from src.logs.log import log
from src.state_manager.hide_n_seek.handler import StateHandler

game_repo = GameRepository()


class StateHandlerHidersWin(StateHandler):
    async def handle(self):
        log.info(f"State 'hiders win' of game with id = {self.game_id}")

        await game_repo.set_active(self.game_id, is_active=False)
