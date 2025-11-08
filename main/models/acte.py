from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class ActesAdministratifs(SQLModel, table=True):
    __tablename__ = "actes_administratifs"
    id: Optional[int] = Field(default=None, primary_key=True)
    numero: str = Field(max_length=50, sa_column_kwargs={"nullable": False})
    objet: Optional[str] = Field(default=None, max_length=255)
    type_acte: Optional[str] = Field(default=None, max_length=50)
    description: Optional[str] = None
    date_creation: Optional[datetime] = None
    date_entree_vigueur: Optional[datetime] = None
    date_expiration: Optional[datetime] = None
    auteur: Optional[str] = Field(default=None, max_length=255)
    base_legale: Optional[str] = Field(default=None, max_length=255)
    public_cible: Optional[str] = Field(default=None, max_length=255)
    domaine_application: Optional[str] = Field(default=None, max_length=255)
    lieu_application: Optional[str] = Field(default=None, max_length=255)
    timbre: Optional[str] = Field(default=None, max_length=50)
    classification: Optional[str] = Field(default=None, max_length=50)
    mots_cles: Optional[str] = Field(default=None, max_length=255)
    statut: Optional[str] = Field(default=None, max_length=50)
    acte_modifie_par: Optional[str] = Field(default=None, max_length=255)
    signataires: Optional[str] = Field(default=None, max_length=255)
    version: Optional[int] = None
    fichier_associe: Optional[str] = Field(default=None, max_length=255)
    date_enregistrement: Optional[datetime] = None
    utilisateur_modification: Optional[str] = Field(default=None, max_length=255)
    actes_references: Optional[str] = None
    actes_applications: Optional[str] = None
    actes_modifies: Optional[str] = None
    actes_modificateurs: Optional[str] = None
    actes_enfants: Optional[str] = None
    acte_original: Optional[str] = None
