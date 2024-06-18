import asyncio
from os import getenv

from aiogram import Bot, Dispatcher
from aiogram.filters.command import CommandStart
from aiogram.types.message import Message

from dotenv import load_dotenv

from src.auth.routes import AuthRouter
from src.auth.schemas import GetTokenRequestSchema

load_dotenv()

TOKEN = getenv("BOT_TOKEN")
FRONT_CREATE_GAME_LINK = getenv("FRONT_CREATE_GAME_LINK")
FRONT_JOIN_GAME_LINK = getenv("FRONT_JOIN_GAME_LINK")

bot = Bot(TOKEN)
dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message):
    user_input = message.text.split()

    if len(user_input) < 1:
        return

    data = user_input[1]
    token = (await AuthRouter.get_token(GetTokenRequestSchema(telegram_id=message.from_user.id))).token

    if data == "create_game":
        await message.answer(f"{FRONT_CREATE_GAME_LINK}?token={token}&telegram_id={message.from_user.id}")
    else:
        await message.answer(f"{FRONT_JOIN_GAME_LINK}?token={token}&telegram_id={message.from_user.id}&game_id={data}")


async def main():
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
