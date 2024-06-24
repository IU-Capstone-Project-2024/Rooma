from uuid import UUID

from src.common.repository.game import GameRepository
from src.common.repository.game_state import GameStateRepository
from src.common.schemas import CreateGameStateSchema
from src.database import Game
from src.state_manager.hide_n_seek.state import State

game_repo = GameRepository()
game_state_repo = GameStateRepository()


class StateHandler:
    __entry_state = State.DISTRIBUTE

    def __init__(self, game_id: UUID):
        self.game_id = game_id

    async def get_current_game(self) -> Game | None:
        return await game_repo.get_one_by_game_id(self.game_id)

    async def handle(self):
        pass

    async def set_new_state(self, new_state: State):
        await game_state_repo.set_state_by_game_id(self.game_id, new_state)

    async def handle_current_state(self):
        current_state_handler = await self.get_current_state_handler()
        await current_state_handler.handle()

    async def get_current_state(self) -> State:
        state = await game_state_repo.get_state_by_game_id(self.game_id)
        if state is not None:
            return State(state)

        await game_state_repo.create_one(
            CreateGameStateSchema(
                game_id=self.game_id,
                state=self.__entry_state
            )
        )

        return self.__entry_state

    async def get_current_state_handler(self):
        state = await self.get_current_state()
        handler = self.get_handler_by_state(State(state))
        return handler

    def get_handler_by_state(self, state: State):
        from src.state_manager.hide_n_seek.states.distribute import StateHandlerDistribute
        from src.state_manager.hide_n_seek.states.start import StateHandlerStart
        from src.state_manager.hide_n_seek.states.hiding import StateHandlerHiding
        from src.state_manager.hide_n_seek.states.searching import StateHandlerSearching
        from src.state_manager.hide_n_seek.states.hiders_win import StateHandlerHidersWin
        from src.state_manager.hide_n_seek.states.seekers_win import StateHandlerSeekersWin

        state_to_handler = {
            State.DISTRIBUTE: StateHandlerDistribute,
            State.START: StateHandlerStart,
            State.HIDING: StateHandlerHiding,
            State.SEARCHING: StateHandlerSearching,
            State.HIDERS_WIN: StateHandlerHidersWin,
            State.SEEKERS_WIN: StateHandlerSeekersWin,
        }

        return state_to_handler[state](self.game_id)
