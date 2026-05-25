from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import bills
from app.api.endpoints import health
from app.api.endpoints import receipts
from app.configs.settings import get_settings
from app.infra.database import create_database_client


@asynccontextmanager
async def app_lifespan(app: FastAPI):
    settings = get_settings()
    database_client = create_database_client(settings)
    app.state.database = database_client[settings.database_name]

    yield

    database_client.close()


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="bite-share-backend",
        lifespan=app_lifespan,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_origin],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(bills.router)
    app.include_router(health.router)
    app.include_router(receipts.router)
    return app


app = create_app()
