PERS_ALL_COLUMNS = [
    {"name": "id", "label": "id", "type": "number", "sortable": True, "searchable": True, "tabs": 0},
    {"name": "avatar", "label": "", "type": "image", "sortable": True, "searchable": True, "tabs": 0},
    {"name": "nom", "label": "nom", "type": "text", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "prenom", "label": "prenom", "type": "text", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "grade", "label": "grade", "type": "json", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "naissance_date", "label": "date de naissance", "type": "date", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "naissance_lieu", "label": "lieu de naissance", "type": "text", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "sexe", "label": "sexe", "type": "select", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "cni", "label": "carte nationale d'identé", "type": "json", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "groupe_sanguin", "label": "groupe sanguin", "type": "select", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "taille", "label": "taille", "type": "number", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "pere", "label": "père", "type": "text", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "mere", "label": "mere", "type": "text", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "situation_matrimoniale", "label": "situation matrimoniale", "type": "select", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "nationalite", "label": "nationalite", "type": "select", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "conjoint", "label": "conjoint", "type": "conjoint", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "lde_", "label": "enfants", "type": "json", "sortable": True, "searchable": True, "tabs": 1},
    {"name": "contacts", "label": "contacts", "type": "json", "sortable": True, "searchable": True, "tabs": 3},
    {"name": "matricule_militaire", "label": "matricule militaire", "type": "text", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "matricule_finance", "label": "matricule", "type": "text", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "cim", "label": "carte d'identité militaire", "type": "json", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "affectation", "label": "affectations", "type": "json", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "population", "label": "population", "type": "text", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "cam_", "label": "campagnes", "type": "json", "sortable": True, "searchable": True, "tabs": 5},
    {"name": "pos_", "label": "positions", "type": "json", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "sta_", "label": "statut", "type": "json", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "service", "label": "temps de service", "type": "date", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "der_", "label": "recompenses", "type": "json", "sortable": True, "searchable": True, "tabs": 6},
    {"name": "per_", "label": "permissions", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "pun_", "label": "punitions", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "med_", "label": "medicale", "type": "json", "sortable": True, "searchable": True, "tabs": 7},
    {"name": "specialite", "label": "specialite", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "fci_", "label": "formations", "type": "json", "sortable": True, "searchable": True, "tabs": 4},
    {"name": "dbc_", "label": "diplomes", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "permis", "label": "permis", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "cli_", "label": "competences linguistiques", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "cei_", "label": "competences informatiques", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "csd_", "label": "competences diverses", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "spr_", "label": "sports", "type": "json", "sortable": True, "searchable": True, "tabs": 8},
    {"name": "RET", "label": "prévision de depart à la retraite", "type": "json", "sortable": True, "searchable": True, "tabs": 2},
    {"name": "dcd", "label": "Déces", "type": "json", "sortable": True, "searchable": True, "tabs": 1},
]

USERS_ALL_COLUMNS = [
    {"name": "user_id", "label": "User ID", "type": "int", "sortable": True, "searchable": True},
    {"name": "id", "label": "ID", "type": "int", "sortable": True, "searchable": True},
	{"name": "avatar","label":"","type":"image","sortable":True,"searchable":True},
    {"name": "full_name", "label": "Full Name", "type": "str", "sortable": True, "searchable": True},
    {"name": "username", "label": "Username", "type": "str", "sortable": True, "searchable": True},
    {"name": "type", "label": "Type", "type": "str", "sortable": True, "searchable": True},
    {"name": "is_active", "label": "Is Active", "type": "bool", "sortable": True, "searchable": False},
    {"name": "is_superuser", "label": "Is Superuser", "type": "bool", "sortable": True, "searchable": False},
]

ACTES_ALL_COLUMNS = [
    {"name": "id", "label": "ID", "type": "number", "sortable": True, "searchable": True},

    {"name": "type_acte", "label": "Type d'acte", "type": "select", "sortable": True, "searchable": True},
    {"name": "numero", "label": "Numéro", "type": "text", "sortable": True, "searchable": True},
    {"name": "timbre", "label": "Timbre", "type": "text", "sortable": True, "searchable": True},

    {"name": "date_creation", "label": "Date de création", "type": "date", "sortable": True, "searchable": True},
    {"name": "classification", "label": "Classification", "type": "select", "sortable": True, "searchable": True},

    {"name": "objet", "label": "Objet", "type": "text", "sortable": True, "searchable": True},
    {"name": "statut", "label": "Statut", "type": "select", "sortable": True, "searchable": True},
    {"name": "description", "label": "Description", "type": "text", "sortable": True, "searchable": True},

    {"name": "mots_cles", "label": "Mots clés", "type": "text", "sortable": True, "searchable": True},

    {"name": "date_entree_vigueur", "label": "Entrée en vigueur", "type": "date", "sortable": True, "searchable": True},
    {"name": "date_expiration", "label": "Expiration", "type": "date", "sortable": True, "searchable": True},
    {"name": "date_enregistrement", "label": "Enregistrement", "type": "date", "sortable": True, "searchable": True},

    {"name": "auteur", "label": "Auteur", "type": "text", "sortable": True, "searchable": True},
    {"name": "signataires", "label": "Signataires", "type": "text", "sortable": True, "searchable": True},

    {"name": "fichier_associe", "label": "Fichier associé", "type": "file", "sortable": False, "searchable": False},

    {"name": "base_legale", "label": "Base légale", "type": "text", "sortable": True, "searchable": True},
    {"name": "domaine_application", "label": "Domaine d'application", "type": "text", "sortable": True, "searchable": True},
    {"name": "public_cible", "label": "Public cible", "type": "text", "sortable": True, "searchable": True},
    {"name": "lieu_application", "label": "Lieu d'application", "type": "text", "sortable": True, "searchable": True},

    {"name": "version", "label": "Version", "type": "number", "sortable": True, "searchable": True},

    {"name": "acte_modifie_par", "label": "Modifié par", "type": "text", "sortable": True, "searchable": True},
    {"name": "utilisateur_modification", "label": "Utilisateur modification", "type": "text", "sortable": True, "searchable": True},

    {"name": "actes_references", "label": "Actes référencés", "type": "json", "sortable": False, "searchable": False},
    {"name": "actes_applications", "label": "Actes d'application", "type": "json", "sortable": False, "searchable": False},
    {"name": "actes_modifies", "label": "Actes modifiés", "type": "json", "sortable": False, "searchable": False},
    {"name": "actes_modificateurs", "label": "Actes modificateurs", "type": "json", "sortable": False, "searchable": False},
    {"name": "actes_enfants", "label": "Actes enfants", "type": "json", "sortable": False, "searchable": False},

    {"name": "acte_original", "label": "Acte original", "type": "text", "sortable": True, "searchable": True},
]