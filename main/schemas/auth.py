from pydantic import BaseModel, EmailStr
from typing import Optional
from main.schemas.user import UserCreate, UserRead

class LoginRequest(BaseModel):
    identifier: str  # username or email or phone
    password: str

class RegisterRequest(UserCreate):
    username: str

class AuthResponse(BaseModel):
    access_token: str
    
class TokenData(BaseModel):
    sub: Optional[str] = None