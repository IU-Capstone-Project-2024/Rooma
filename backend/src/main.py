from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.bridge.router import router as bridge_router
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

# include routers
app.include_router(bridge_router)

# CORS
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
