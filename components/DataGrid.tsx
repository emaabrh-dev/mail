"use client";

import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { useEffect, useState, useCallback } from "react";
import { getTables } from "@/lib/client/endpoints";

type ColumnSchema = {
  field: string;
  label: string;
  width?: number;
  type?: string;
};

export default function GenericDataGrid({
  gn,
  extraFilters = {},
}: {
  gn: string;
  extraFilters?: Record<string, any>;
}) {
  const tablesApi = getTables();

  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // ---------------------------------------
  // 🔹 STEP 1 — Load columns from API
  // ---------------------------------------
  const loadColumns = useCallback(async () => {
    try {
      const params = {gn};
      const res = await tablesApi.getColumnsAllApiTablesColumnsGet(params);
      const gridColumns = res.data;
      if (!gridColumns) {
        console.error("Grid not found in /columns response:", gn);
        return;
      }

      const muiCols: GridColDef[] = gridColumns.map((col: ColumnSchema) => ({
        field: col.field,
        headerName: col.label,        // ⬅ IMPORTANT: backend uses "label"
        width: col.width ?? 150,
        type: col.type as any,
      }));


      setColumns(muiCols);
    } catch (err) {
      console.error("Error loading columns:", err);
    }
  }, [gn]);

  // ---------------------------------------
  // 🔹 STEP 2 — Load data (server-side)
  // ---------------------------------------
const loadData = useCallback(async () => {
  try {
    const sort = sortModel[0];

    const params = {
      gn,
      page: page + 1,
      rows: pageSize,
      sidx: sort?.field ?? undefined,
      sord: sort?.sort ?? "asc",
      ...extraFilters, // merged filters
    };

    const res = await tablesApi.getDataApiTablesDataGet(params);

    const payload = res.data ?? {};

    setRows(payload.rows || []);
    setTotal(payload.total || 0);
  } catch (err) {
    console.error("Error loading data:", err);
  }
}, [
  gn,
  page,
  pageSize,
  sortModel,
  JSON.stringify(extraFilters), // prevents infinite loop
]);

  // ---------------------------------------
  // 🔹 Load columns on mount
  // ---------------------------------------
  useEffect(() => {
    loadColumns();
  }, [loadColumns]);

  // ---------------------------------------
  // 🔹 Fetch data whenever dependency changes
  // ---------------------------------------
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={total}
      pagination
      paginationMode="server"
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={(m) => {
        setPage(m.page);
        setPageSize(m.pageSize);
      }}
      sortingMode="server"
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      pageSizeOptions={[25, 50, 100]}
      autoHeight
      disableRowSelectionOnClick
      loading={columns.length === 0}
    />
  );
}