from datetime import datetime
from uuid import UUID

from src.common.repository.game import GameRepository
from src.database import Game
from src.state_manager.hide_n_seek.state import State

game_repo = GameRepository()


class StateHandler:
    def __init__(self, game_id: UUID):
        self.game_id = game_id

    async def get_current_game(self) -> Game | None:
        return await game_repo.get_one_by_game_id(self.game_id)

    async def handle(self):
        pass

    async def set_new_state(self, new_state: State, changed_at: datetime | None = None):
        pass
        # if changed_at is None:
        #     changed_at = datetime.now()
        #
        # await UserInChannelRepository.set_state(
        #     self.user_id, self.channel_id, new_state, changed_at
        # )

    async def handle_current_state(self):
        current_state_handler = await self.get_current_state_handler()
        await current_state_handler.handle()

    async def get_current_state_handler(self):
        pass
        # state = await UserInChannelRepository.get_state(self.user_id, self.channel_id)
        # handler = self.get_handler_by_state(state)
        # return handler

    def get_handler_by_state(self, state):
        from states.distribute import StateHandlerDistribute
        from states.start import StateHandlerStart
        # from states.handler_to_decline import StateHandlerToDecline
        # from states.handler_declined import StateHandlerDeclined
        # from states.handler_ignored import StateHandlerIgnored
        # from states.handler_to_approve import StateHandlerToApprove
        # from states.handler_in_channel import StateHandlerInChannel
        # from states.handler_to_exchange import StateHandlerToExchange
        # from states.handler_to_kick import StateHandlerToKick
        # from states.handler_to_kick_subchannels import StateHandlerToKickSubchannels
        # from states.handler_kicked import StateHandlerKicked
        # from states.handler_archived import StateHandlerArchived

        state_to_handler = {
            State.DISTRIBUTE: StateHandlerDistribute,
            State.START: StateHandlerStart,
            # State.TO_DECLINE: StateHandlerToDecline,
            # State.DECLINED: StateHandlerDeclined,
            # State.IGNORED: StateHandlerIgnored,
            # State.TO_APPROVE: StateHandlerToApprove,
            # State.IN_CHANNEL: StateHandlerInChannel,
            # State.TO_EXCHANGE: StateHandlerToExchange,
            # State.TO_KICK: StateHandlerToKick,
            # State.TO_KICK_SUBCHANNELS: StateHandlerToKickSubchannels,
            # State.KICKED: StateHandlerKicked,
            # State.ARCHIVED: StateHandlerArchived,
            # None: StateHandlerArchived
        }

        return state_to_handler[state](self.game_id)
