from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from main.api.deps import SessionDep
from main.crud import get_user_by_username, get_user_by_email, get_user_by_phone

router = APIRouter(prefix="/check", tags=["User Checks"])

@router.get("/username")
def check_username(session: SessionDep, username: str = Query(...)):
    exists = get_user_by_username(session, username)
    return {"available": not bool(exists)}

@router.get("/email")
def check_email(session: SessionDep, email: str = Query(...)):
    exists = get_user_by_email(session, email)
    return {"available": not bool(exists)}

@router.get("/phone")
def check_phone(session: SessionDep, phone: str = Query(...)):
    exists = get_user_by_phone(session, phone)
    return {"available": not bool(exists)}
