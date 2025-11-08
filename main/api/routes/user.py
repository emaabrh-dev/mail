from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from main.schemas import UserCreate, UserRead, UserUpdate
from main.crud import user as user_crud
from main.api.deps import SessionDep
from .check_user import router as check_router

router = APIRouter(prefix="/users", tags=["Users"])
router.include_router(check_router)

@router.post("/", response_model=UserRead)
def create_user_route(user: UserCreate, session: SessionDep):
    return user_crud.create_user(session, user)

@router.get("/", response_model=list[UserRead])
def list_users(session: SessionDep):
    return user_crud.get_all_users(session)

@router.get("/{user_id}", response_model=UserRead)
def read_user(user_id: int, session: SessionDep):
    db_user = user_crud.get_user(session, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.patch("/{user_id}", response_model=UserRead)
def update_user_route(user_id: int, user: UserUpdate, session: SessionDep):
    updated = user_crud.update_user(session, user_id, user)
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated

@router.delete("/{user_id}")
def delete_user_route(user_id: int, session: SessionDep):
    deleted = user_crud.delete_user(session, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"ok": True}

