"use client";

import { useState, useEffect } from "react";
import { getActes } from "@/lib/client/endpoints/actes";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

interface Acte {
  id: number;
  numero: string;
  objet: string;
  type_acte: string;
  statut: string;
}

export default function ActesPage() {
  const [actes, setActes] = useState<Acte[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function fetchActes() {
      const { readActesApiActesGet } = getActes();
      const response = await readActesApiActesGet();
      setActes(response.data);
    }

    fetchActes();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Actes Administratifs
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Numéro</TableCell>
              <TableCell>Objet</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {actes.length > 0 ? (
              actes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.numero}</TableCell>
                    <TableCell>{item.objet}</TableCell>
                    <TableCell>{item.type_acte}</TableCell>
                    <TableCell>{item.statut}</TableCell>
                    <TableCell>
                      <MuiLink
                        component={Link}
                        href={`/actes/${item.id}`}
                        underline="hover"
                        color="primary"
                      >
                        Voir
                      </MuiLink>
                      {" | "}
                      <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      >
                        Edit
                      </Button>
                      {" | "}
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Aucun acte trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={actes.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

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