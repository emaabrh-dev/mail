#main/api/auth/routes.py
from fastapi import APIRouter, HTTPException
from main.schemas.auth import LoginRequest, RegisterRequest, AuthResponse
from main.services.auth_service import *
from main.crud import get_user_by_identifier, get_user_by_username, get_user_by_email, get_user_by_phone

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=AuthResponse)
def login(data: LoginRequest, session: SessionDep):
    user = get_user_by_identifier(session, data.identifier)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    return AuthResponse(access_token=token)

@router.post("/register", response_model=AuthResponse)
def register(data: RegisterRequest, session: SessionDep):
    if (data.username and get_user_by_username(session, data.username)) or \
       (data.email and get_user_by_email(session, data.email)) or \
       (data.phone and get_user_by_phone(session, data.phone)):
        raise HTTPException(status_code=400, detail="User already exists")

    user = register_user(session, data.username, data.email, data.phone if data.phone is not None else "", data.password)
    token = create_access_token({"sub": user.username})
    return AuthResponse(access_token=token)