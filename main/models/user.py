from sqlmodel import Relationship, SQLModel, Field
from typing import List, Optional
import datetime

from main.models.session import UserSession

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    phone: Optional[str] = Field(default=None, index=True, unique=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime.datetime = Field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc))
    sessions: List["UserSession"] = Relationship(back_populates="user")