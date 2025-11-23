# main/api/tables.py
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Request, Query, Depends, HTTPException
from fastapi.responses import JSONResponse
from main.tables.models import TableBuilder
from main.api.deps import SessionDep
from main.types import TableFilters

router = APIRouter(prefix="/tables", tags=["Tables"])
table_builder = TableBuilder()

@router.get('/columns', response_model=List[Dict[str, Any]])
async def get_columns_all(
    gn: str = Query(..., description="Grid name, e.g., 'person', 'users', 'actes'")
):
    columns = table_builder.get_columns(gn)
    if columns is None:
        raise HTTPException(404, "Column not found")

    response = [{
        "field": col["name"],
        "label": col.get("label", col["name"]),
        "type": col.get("type", "string"),
        "sortable": col.get("sortable", True),
        "filterable": col.get("searchable", True),
    } for col in columns]

    return JSONResponse(response)


@router.get("/data")
async def get_data(
    session: SessionDep,
    gn: str = Query(...),
    page: int = Query(1),
    rows: int = Query(50),
    sidx: Optional[str] = Query(None),
    sord: str = Query("asc"),
    search: Optional[bool] = Query(False),
    filters: Optional[str] = Query(None),
    extra_data: Optional[str] = Query(None)  # placeholder for unknown extras
):
    filters_obj = TableFilters(
        gn=gn,
        page=page,
        rows=rows,
        sidx=sidx,
        sord=sord,
        search=search,
        filters=filters,
    )
    data = table_builder.collect_data(session, filters_obj)
    return JSONResponse(data or {})