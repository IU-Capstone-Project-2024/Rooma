from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.database import init_db
from src.logs.log import log


@asynccontextmanager
async def lifespan(app: FastAPI):
    # before startup
    await init_db()
    log.info("Application startup")

    yield

    # after finishing
    log.info("Application shutdown")


app = FastAPI(lifespan=lifespan)
