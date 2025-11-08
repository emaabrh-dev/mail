from fastapi import APIRouter, Depends, HTTPException, Request
from typing import List

from main.api.deps import SessionDep, get_current_user
from main.schemas import UserSessionCreate, UserSessionRead, UserSessionUpdate
from main.crud import create_user_session, get_user_sessions, get_user_session_by_id, update_user_session, deactivate_user_session, get_user_session_last
from main.models import User

router = APIRouter(prefix="/sessions", tags=["Sessions"])

@router.post("", response_model=UserSessionRead)
def create_session(data: UserSessionCreate, db: SessionDep, request: Request):
    data.ip_address = request.client.host if request.client else "unknown"
    data.user_agent = request.headers.get("user-agent", "unknown")
    return create_user_session(db, data)

@router.post("/", response_model=UserSessionRead)
def create_session_(data: UserSessionCreate, db: SessionDep, request: Request):
    return create_session(data, db, request)

@router.get("/current", response_model=UserSessionRead)
def get_current_session(db: SessionDep, user: User = Depends(get_current_user)):
    session = get_user_session_last( db, user.id)
    if not session:
        raise HTTPException(status_code=401, detail="No session")
    return session

@router.get("/active/{user_id}", response_model=List[UserSessionRead])
def get_active_sessions(user_id: int, db: SessionDep):
    return get_user_sessions(db, user_id)

@router.get("/{session_id}", response_model=UserSessionRead)
def get_session_by_id(session_id: str, db: SessionDep):
    session = get_user_session_by_id(db, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.patch("/{session_id}", response_model=UserSessionRead)
def update_session(session_id: str, update: UserSessionUpdate, db: SessionDep):
    session = update_user_session(db, session_id, update)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.delete("/{session_id}", response_model=UserSessionRead)
def deactivate_session(session_id: str, db: SessionDep):
    session = deactivate_user_session(db, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session
