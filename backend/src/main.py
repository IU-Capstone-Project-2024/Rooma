from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

from src.auth.routes import auth_router
from src.database import init_db
from src.exceptions import BaseAppException
from src.games.hide_n_seek.routes import router as hide_n_seek_router
from src.games.routes import router as games_router
from src.logs.log import log
from src.vars.config import APP_ROOT_PATH, APP_DESCRIPTION, APP_TITLE


@asynccontextmanager
async def lifespan(app: FastAPI):
    # before startup
    log.info("Database initialization")
    await init_db()

    log.info("Prometheus instrumentator initialization")
    instrumentator.expose(app)

    log.info("Application startup")

    yield

    # after finishing
    log.info("Application shutdown")


app = FastAPI(
    lifespan=lifespan,
    root_path=APP_ROOT_PATH,
    title=APP_TITLE,
    description=APP_DESCRIPTION,
    version="0.3.0"
)
instrumentator = Instrumentator().instrument(app)

# include routers
app.include_router(games_router)
app.include_router(auth_router)
app.include_router(hide_n_seek_router)

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


@app.exception_handler(BaseAppException)
def handle_exceptions(request: Request, exc: BaseAppException):
    raise HTTPException(status_code=exc.http_code, detail=exc.message)
