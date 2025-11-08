# File: main/api/__init__.py

from fastapi import APIRouter
from .routes import auth, user, session, acte

api = APIRouter()
api.include_router(auth.router)
api.include_router(user.router)
api.include_router(session.router)
api.include_router(acte.router)