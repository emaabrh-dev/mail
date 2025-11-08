# 📄 main/config/settings.py

from pydantic import ConfigDict
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"  # ignore extra fields from environment
    )

    app_name: str = "AERO RH"
    app_env: str = "development"
    app_debug: bool = True

    host: str = "0.0.0.0"
    port: int = 9721
    backend_url: str = "http://localhost:9721"

    database_url: str = "sqlite:///main/db/data.db"

    secret_key: str = "your_default_secret_key"
    access_token_expire_minutes: int = 60

    allowed_origins: str = "http://localhost:3001"

    log_level: str = "info"


settings = Settings()
