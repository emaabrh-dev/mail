from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    phone: str
    password: str  # plain password for registration

class UserRead(BaseModel):
    id: int
    username: str
    email: EmailStr
    phone: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
