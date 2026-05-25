from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.endpoints import health
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
    app = FastAPI(
        title="project-template-backend",
        lifespan=app_lifespan,
    )
    app.include_router(health.router)
    return app


app = create_app()
