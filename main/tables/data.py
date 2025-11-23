import math
import re
from fastapi import Request, HTTPException
from typing import List, Dict, Any, Optional
import logging

from main.utils import tryInt
#from main.settings import settings
from .filter import _apply_filter

class Data:
    def __init__(self, request: Request, data: List[Dict[str, Any]], column_list: List[Dict[str, str]]):
        self._initialize_parameters(request)
        self._data = data
        self._field_names = [column['name'] for column in column_list]

        if self._search_enabled:
            self._apply_search_filters(request.query_params)
        
        self._count = len(self._data)
        self._limit = self._validate_limit(self._limit, self._count)
        self._total_pages = self._calculate_total_pages(self._count, self._limit)
        self._page = self._validate_page(self._page, self._total_pages)
        
        self._rs = self._paginate_data()

    def _initialize_parameters(self, request: Request):
        """Initialize and validate request parameters."""
        self._grid_name = request.query_params.get('gn', '')
        self._data_type = request.query_params.get('dt', 'json')
        self._sql_filter = ''
        self._has_pagecount = True

        self._page = self._validate_integer(request.query_params.get('page', 1), 'page')
        self._limit = self._validate_integer(request.query_params.get('rows', 0), 'rows')
        self._sidx = request.query_params.get('sidx', '1')  # Sorting index or default to '1'
        self._sord = request.query_params.get('sord', 'asc')  # Sorting order

        self._search_enabled = request.query_params.get('_search', 'false') == 'true'

    def _validate_integer(self, value: Any, name: str) -> int:
        """Validate and return an integer from a value, raise an error if invalid."""
        try:
            int_value = tryInt(value)
            if int_value < 0:
                raise ValueError
            return int_value
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid value for {name}: {value}")

    def _validate_limit(self, limit: int, count: int) -> int:
        """Ensure limit is positive and does not exceed the total count."""
        return max(min(limit, count), 1)  # Ensure limit is at least 1

    def _validate_page(self, page: int, total_pages: int) -> int:
        """Ensure the page is within the valid range."""
        return min(max(page, 1), total_pages)  # Ensure page is at least 1 and does not exceed total pages

    def _calculate_total_pages(self, count: int, limit: int) -> int:
        """Calculate the total number of pages."""
        return math.ceil(count / limit) if count > 0 and limit > 0 else 1

    def _apply_search_filters(self, query_params: Dict[str, str]):
        """Filter the data based on search parameters."""
        def check_row(row: Dict[str, Any], column_name: str, value: str) -> bool:
            """Check if a row matches the search value using a regex."""
            try:
                return bool(re.search(re.escape(value), str(row.get(column_name, '')), re.IGNORECASE))
            except re.error as e:
                logging.error(f"Regex error: {e} for value: {value}")
                return False

        for key, value in query_params.items():
            if key in self._field_names:
                self._data = [row for row in self._data if check_row(row, key, value)]

    def _paginate_data(self) -> List[Dict[str, Any]]:
        """Paginate the data based on current page and limit."""
        start_index = max(self._limit * (self._page - 1), 0)
        return self._data[start_index:start_index + self._limit]

    def get_data(self) -> Dict[str, Any]:
        """Return the paginated and filtered data."""
        rows = []

        for row in self._rs:
            row_id = row.get("id")  # Use primary key if present
            if row_id is None:
                row_id = id(row)     # Fallback for grids without pk

            rows.append({
                'id': row_id,
                'cell': row
            })

        return {
            'page': self._page,
            'total': self._total_pages,
            'records': self._count,
            'rows': rows
        }

    def gen_rowids(self, arr: List[str], keys: List[str]) -> str:
        """Generate row IDs by concatenating key values with a delimiter."""
        rowids = settings['PK_DELIMITER'].join(str(arr[key]) for key in keys if key in arr)
        return rowids
    
    def apply_filter(self, row: Dict[str, Any], field: str, operator: str, value: str) -> bool:
        """Apply a specific filter to a row."""
        return _apply_filter(self, row=row, field=field, operator=operator, value=value)
