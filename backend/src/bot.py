import asyncio

from aiogram import Bot, Dispatcher
from aiogram.filters.command import CommandStart
from aiogram.types.message import Message

from dotenv import load_dotenv

from src.auth.routes import AuthRouter
from src.auth.schemas import GetTokenRequestSchema
from src.common.repository.user import UserRepository
from src.database import User, init_db
from src.vars.config import TOKEN, FRONT_CREATE_GAME_LINK, FRONT_JOIN_GAME_LINK

load_dotenv()

bot = Bot(TOKEN)
dp = Dispatcher()
user_repository = UserRepository()


@dp.message(CommandStart())
async def start(message: Message):
    user = await user_repository.get_user(message.from_user.id)
    if user is None:
        await user_repository.create_one(
            User(
                telegram_id=message.from_user.id,
                username=message.from_user.username,
                first_name=message.from_user.first_name,
                last_name=message.from_user.last_name
            )
        )

    user_input = message.text.split()

    if len(user_input) < 1:
        return

    data = user_input[1]
    token = (await AuthRouter.get_refresh_token(GetTokenRequestSchema(telegram_id=message.from_user.id))).token

    if data == "create_game":
        await message.answer(f"{FRONT_CREATE_GAME_LINK}?token={token}&telegram_id={message.from_user.id}")
    else:
        await message.answer(f"{FRONT_JOIN_GAME_LINK}?token={token}&telegram_id={message.from_user.id}&game_id={data}")


async def main():
    await init_db()
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
