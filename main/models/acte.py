from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class ActesAdministratifs(SQLModel, table=True):
    __tablename__ = "actes_administratifs"
    id: Optional[int] = Field(default=None, primary_key=True)
    type_acte: Optional[str] = Field(default=None, max_length=50)
    numero: str = Field(max_length=50, sa_column_kwargs={"nullable": False})
    timbre: Optional[str] = Field(default=None, max_length=50)
    date_creation: Optional[datetime] = None
    classification: Optional[str] = Field(default=None, max_length=50)
    objet: Optional[str] = Field(default=None, max_length=255)
    statut: Optional[str] = Field(default=None, max_length=50)
    description: Optional[str] = None
    mots_cles: Optional[str] = Field(default=None, max_length=255)
    date_entree_vigueur: Optional[datetime] = None
    date_expiration: Optional[datetime] = None
    date_enregistrement: Optional[datetime] = None
    auteur: Optional[str] = Field(default=None, max_length=255)
    signataires: Optional[str] = Field(default=None, max_length=255)
    fichier_associe: Optional[str] = Field(default=None, max_length=255)
    base_legale: Optional[str] = Field(default=None, max_length=255)
    domaine_application: Optional[str] = Field(default=None, max_length=255)
    public_cible: Optional[str] = Field(default=None, max_length=255)
    lieu_application: Optional[str] = Field(default=None, max_length=255)
    version: Optional[int] = None
    acte_modifie_par: Optional[str] = Field(default=None, max_length=255)
    utilisateur_modification: Optional[str] = Field(default=None, max_length=255)
    actes_references: Optional[str] = None
    actes_applications: Optional[str] = None
    actes_modifies: Optional[str] = None
    actes_modificateurs: Optional[str] = None
    actes_enfants: Optional[str] = None
    acte_original: Optional[str] = None
