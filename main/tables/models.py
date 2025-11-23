#main/tables/models.py 
import logging
import urllib.parse
from typing import Any, Dict, List, Optional, Callable
from sqlmodel import Session
from fastapi import Request

from main.utils import get_filters_list_from_string
from main.tables.data import Data
from main.tables import schemas
#from main.crud.pers_for_table import get_pers_for_table
from main.crud.user import get_user
from main.types import TableFilters

logger = logging.getLogger(__name__)


class TableBuilder:
    """
    Builds table data dynamically based on grid name + filters.

    Fully extensible: simply add your new grid in GRID_REGISTRY
    with its columns + fetch function.
    """

    # ---------------------------
    # 1️⃣ Registry: columns + fetcher
    # ---------------------------
    GRID_REGISTRY: Dict[str, Dict[str, Any]] = {
        "person": {
            "columns": schemas.PERS_ALL_COLUMNS,
            "fetch": lambda session, filters: None,  #get_pers_for_table,
        },
        "users": {
            "columns": schemas.USERS_ALL_COLUMNS,
            "fetch": get_user,
        },
        "actes": {
            "columns": schemas.ACTES_ALL_COLUMNS,
            "fetch": lambda session, filters: None,  # Placeholder
        },
    }

    def __init__(self) -> None:
        self._custom_data: Optional[Any] = None

    # ---------------------------
    # 2️⃣ Allow custom preloaded data
    # ---------------------------
    def set_data(self, **data: Any) -> None:
        """Override CRUD and force custom data for next call."""
        self._custom_data = data

    # ---------------------------
    # 3️⃣ Main data collector
    # ---------------------------
    def collect_data(self, session: Session, query: TableFilters) -> Optional[Any]:
        grid = query.gn  # use dot access

        # ---------------------------
        # Validate 'gn'
        # ---------------------------
        if not grid:
            logger.warning("Missing 'gn' query parameter 'gn'")
            return None

        registry_block = self.GRID_REGISTRY.get(grid)
        if not registry_block:
            logger.error("Unsupported grid '%s'", grid)
            return None

        columns = registry_block["columns"]
        fetch_function: Callable = registry_block["fetch"]

        # ---------------------------
        # Parse "active" flag
        # ---------------------------
        active = getattr(query, "active", 0) == 1
        base_filters: Dict[str, Any] = {"active": {"eq": active}}

        # ---------------------------
        # Parse complex filters    (field:op:value;field2:op:value2)
        # ---------------------------
        raw_filters = query.filters
        if raw_filters:
            decoded = urllib.parse.unquote(raw_filters)

            for item in decoded.split(";"):
                parts = item.split(":", 2)
                if len(parts) != 3:
                    logger.error("Invalid filter format: %s", item)
                    continue

                field, op, val = parts

                if op == "in":
                    base_filters[field] = {"in": val.split(",")}
                else:
                    base_filters[field] = {op: val}

        # ---------------------------
        # Column filtering via "cols"
        # ---------------------------
        raw_cols = getattr(query, "cols", None)
        if raw_cols:
            try:
                indices = get_filters_list_from_string(raw_cols)
                columns = [col for idx, col in enumerate(columns) if idx in indices]
            except Exception as e:
                logger.error("Invalid 'cols' filter: %s", e)

        # ---------------------------
        # Data source: custom OR registry fetch
        # ---------------------------
        if self._custom_data is not None:
            data_source = self._custom_data
            self._custom_data = None
        else:
            data_source = fetch_function(session, base_filters)

        if data_source is None:
            logger.info("No data returned for grid '%s'", grid)
            return None

        # ---------------------------
        # Final data formatting
        # ---------------------------
        # Data needs original request object? If not, pass query instead or adapt Data class
        return Data(query, data_source, columns).get_data()

    # ---------------------------
    # 4️⃣ Optional: public column accessor
    # ---------------------------
    def get_columns(self, grid: str) -> Optional[List[Dict[str, Any]]]:
        block = self.GRID_REGISTRY.get(grid)
        return block["columns"] if block else None