import re
from typing import Optional
from sqlmodel import Session, select
from passlib.context import CryptContext
from main.models import User
from main.schemas import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(session: Session, user_id: int) -> User | None:
    return session.get(User, user_id)

def get_user_by_username(session: Session, username: str) -> Optional[User]:
    return session.exec(select(User).where(User.username == username)).first()

def get_user_by_email(session: Session, email: str) -> Optional[User]:
    return session.exec(select(User).where(User.email == email)).first()

def get_user_by_phone(session: Session, phone: str) -> Optional[User]:
    return session.exec(select(User).where(User.phone == phone)).first()

def get_user_by_identifier(session: Session, identifier: str) -> Optional[User]:
    # Check if it's an email
    if "@" in identifier:
        return get_user_by_email(session, identifier)
    # Check if it's a phone (basic digits-only check)
    elif re.fullmatch(r"\+?\d{6,}", identifier):
        return get_user_by_phone(session, identifier)
    else:
        return get_user_by_username(session, identifier)

def get_all_users(session: Session) -> list[User]:
    return list(session.exec(select(User)).all())

def create_user(session: Session, user_data: UserCreate) -> User:
    hashed_password = pwd_context.hash(user_data.password)
    user = User(
        username=user_data.username,
        email=user_data.email,
        phone=user_data.phone,
        hashed_password=hashed_password
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def update_user(session: Session, user_id: int, updates: UserUpdate) -> User | None:
    user = session.get(User, user_id)
    if not user:
        return None
    user_data = updates.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    session.commit()
    session.refresh(user)
    return user

def delete_user(session: Session, user_id: int) -> bool:
    user = session.get(User, user_id)
    if not user:
        return False
    session.delete(user)
    session.commit()
    return True
