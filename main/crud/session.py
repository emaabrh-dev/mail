import datetime
from fastapi import HTTPException
from sqlmodel import Session, select
from sqlalchemy import desc
from typing import List, Optional
from main.models import UserSession
from main.schemas import UserSessionCreate, UserSessionUpdate
from main.models.user import User
from main.crud.user import get_user_by_identifier

def create_user_session(db: Session, data: UserSessionCreate) -> UserSession:
    # Rechercher l'utilisateur par username / email / phone
    user = get_user_by_identifier(db, data.identifier)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    session = UserSession(
        user_id=user.id,
        ip_address=data.ip_address or "",
        user_agent=data.user_agent or "",
        created_at=data.created_at or datetime.datetime.now(datetime.timezone.utc),
        last_active=data.last_active or datetime.datetime.now(datetime.timezone.utc),
        is_active=True
    )

    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def get_user_sessions(db: Session, user_id: int) -> List[UserSession]:
    return list(db.exec(select(UserSession).where(UserSession.user_id == user_id, UserSession.is_active == True)).all())

def get_user_session_last(db: Session, user_id: int) -> Optional[UserSession]:
    return db.exec(
        select(UserSession)
        .where(UserSession.user_id == user_id, UserSession.is_active == True)
        .order_by(desc(UserSession.last_active))  # Use the SQLModel column, not the Python type
        .limit(1)
    ).first()

def update_user_session(db: Session, session_id: str, update: UserSessionUpdate) -> Optional[UserSession]:
    session = db.get(UserSession, session_id)
    if session:
        for key, value in update.model_dump(exclude_unset=True).items():
            setattr(session, key, value)
        db.commit()
        db.refresh(session)
    return session

def deactivate_user_session(db: Session, session_id: str) -> Optional[UserSession]:
    return update_user_session(db, session_id, UserSessionUpdate(is_active=False))

def get_user_session_by_id(db: Session, session_id: str) -> Optional[UserSession]:
    return db.get(UserSession, session_id)
