from contextlib import contextmanager
import logging
from sqlmodel import SQLModel, create_engine, Session, inspect, text
import os

# Ensure the data directory exists
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

# Database URL for SQLite
DATABASE_URL = f"sqlite:///{os.path.join(DATA_DIR, 'data.db')}"

# SQLAlchemy engine
engine = create_engine(DATABASE_URL, echo=False)

def get_sql_dialect(session) -> str:
    return session.bind.dialect.name 

def create_all_tables():
    SQLModel.metadata.create_all(engine)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def update_schema_if_needed():
    inspector = inspect(engine)
    # Get all table names from the database
    existing_tables = inspector.get_table_names()
    
    # Loop over each table defined in SQLModel's metadata
    for table_name, table_obj in SQLModel.metadata.tables.items():
        logging.info(f"Processing table: {table_name}")
        if table_name not in existing_tables:
            logging.info(f"Table {table_name} does not exist. Creating it.")
            table_obj.create(engine)
        else:
            # Get the existing column names in the database table
            db_columns = {col["name"] for col in inspector.get_columns(table_name)}
            for column in table_obj.columns:
                if column.name not in db_columns:
                    logging.info(f"Table {table_name}: missing column '{column.name}'. Attempting to add it.")
                    # Compile the column specification
                    col_spec = str(column.compile(dialect=engine.dialect))
                    # Remove the table prefix if present
                    prefix = f"{table_name}."
                    if col_spec.startswith(prefix):
                        col_spec = col_spec[len(prefix):]
                    alter_stmt = f"ALTER TABLE {table_name} ADD COLUMN {col_spec}"
                    try:
                        with engine.connect() as conn:
                            conn.execute(text(alter_stmt))
                            conn.commit()
                        logging.info(f"Added column '{column.name}' to table '{table_name}'.")
                    except Exception as e:
                        logging.error(f"Failed to add column '{column.name}' to table '{table_name}': {e}")

