from contextlib import asynccontextmanager
import logging
import json

from fastapi import FastAPI, Request
from starlette.responses import RedirectResponse

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
        {"name": "Auth", "description": "Authentication and authorization endpoints"},
        {"name": "Sessions", "description": "User session management"},
        {"name": "Tables", "description": "Data table operations"},
        {"name": "Users", "description": "User management operations"},
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



@app.middleware("http")
async def remove_trailing_slash(request: Request, call_next):
    path = request.url.path

    # Skip root
    if path != "/" and path.endswith("/"):
        new_path = path.rstrip("/")
        # Preserve query string
        if request.url.query:
            new_path += f"?{request.url.query}"
        return RedirectResponse(url=new_path, status_code=307)

    # Default: proceed normally
    return await call_next(request)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AERO RH API"}
