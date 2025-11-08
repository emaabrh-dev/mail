from pydantic import BaseModel
from sqlmodel import Field, SQLModel
from datetime import datetime
from typing import Optional

class UserSessionCreate(BaseModel):
    identifier: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: Optional[datetime] = None
    last_active: Optional[datetime] = None

class UserSessionRead(BaseModel):
    id: str
    user_id: int
    ip_address: str
    user_agent: str
    created_at: datetime
    last_active: datetime
    is_active: bool

    class Config:
        from_attributes = True

class UserSessionUpdate(SQLModel):
    last_active: Optional[datetime] = None
    is_active: Optional[bool] = None
