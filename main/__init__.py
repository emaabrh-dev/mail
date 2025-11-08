from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI

from main.db import create_db_and_tables, update_schema_if_needed
from main.config.settings import settings
from main.api import api

from sqlalchemy.orm import configure_mappers
configure_mappers()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.basicConfig(level=logging.INFO)
    create_db_and_tables()
    update_schema_if_needed()
    yield
    # Cleanup here if needed

def create_app() -> FastAPI:
    tags_metadata = [
        {"name": "Actes", "description": "Legal references and decrees"},
    ]
    
    app = FastAPI(
        title=settings.app_name,
        debug=settings.app_debug,
        lifespan=lifespan,
        openapi_tags=tags_metadata
    )
    app.include_router(api, prefix="/api")
    return app

app = create_app()
#get_data()  # Clean REM data on startup

@app.get("/")
def read_root():
    return {"message": "Welcome to the AERO RH API"}
