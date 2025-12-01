"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import GenericDataGrid from "@/components/DataGrid";

export default function ActesPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Actes Administratifs
      </Typography>

      {/* 🔹 Replace old table with the dynamic datagrid */}
      <GenericDataGrid gn="actes" />

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/actes/new"
        >
          + Créer un acte
        </Button>
      </Box>
    </Box>
  );
}