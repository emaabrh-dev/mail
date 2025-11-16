from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from main.models.acte import ActesAdministratifs as Acte
from main.schemas.acte import ActeCreate, ActeRead, ActeUpdate
from main.api.deps import SessionDep

router = APIRouter(prefix="/actes", tags=["Actes"])

@router.post("", response_model=ActeRead)
def create_acte(acte: ActeCreate, session: SessionDep):
    db_acte = Acte.from_orm(acte)
    session.add(db_acte)
    session.commit()
    session.refresh(db_acte)
    return db_acte

@router.get("", response_model=list[ActeRead])
def read_actes(session: SessionDep):
    return session.exec(select(Acte)).all()

@router.get("/{acte_id}", response_model=ActeRead)
def read_acte(acte_id: int, session: SessionDep):
    acte = session.get(Acte, acte_id)
    if not acte:
        raise HTTPException(status_code=404, detail="Acte not found")
    return acte

@router.patch("/{acte_id}", response_model=ActeRead)
def update_acte(acte_id: int, acte: ActeUpdate, session: SessionDep):
    db_acte = session.get(Acte, acte_id)
    if not db_acte:
        raise HTTPException(status_code=404, detail="Acte not found")
    acte_data = acte.dict(exclude_unset=True)
    for key, value in acte_data.items():
        setattr(db_acte, key, value)
    session.add(db_acte)
    session.commit()
    session.refresh(db_acte)
    return db_acte

@router.delete("/{acte_id}")
def delete_acte(acte_id: int, session: SessionDep):
    acte = session.get(Acte, acte_id)
    if not acte:
        raise HTTPException(status_code=404, detail="Acte not found")
    session.delete(acte)
    session.commit()
    return {"ok": True}
