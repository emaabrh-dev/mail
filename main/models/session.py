from typing import Optional
from sqlmodel import Relationship, SQLModel, Field
from datetime import datetime, timezone
import uuid

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user import User


class UserSession(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    ip_address: str
    user_agent: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_active: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True
    
    # Relationship backref (if needed)
    user: Optional["User"] = Relationship(back_populates="sessions")
