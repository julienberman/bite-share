from motor.motor_asyncio import AsyncIOMotorClient

from app.configs.settings import Settings


def create_database_client(settings: Settings) -> AsyncIOMotorClient:
    return AsyncIOMotorClient(settings.database_url)
