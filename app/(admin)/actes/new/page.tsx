// app/(admin)/actes/new/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ActeCreate } from "@/lib/client/schemas";
import { FormField } from "@/components/FormField";
import { getTables } from "@/lib/client/endpoints";

export default function NewActePage() {
  // 🛠 FIX: memoize tablesApi so it does NOT recreate every render
  const tablesApi = useMemo(() => getTables(), []);

  const [formValues, setFormValues] = useState<Partial<ActeCreate>>({});
  const [fields, setFields] = useState([]);

  useEffect(() => {
    async function loadColumns() {
      try {
        const res = await tablesApi.getColumnsAllApiTablesColumnsGet({
          gn: "actes",
        });

        setFields(res.data || []);
      } catch (err) {
        console.error("Error loading columns:", err);
      }
    }

    loadColumns();
  }, [tablesApi]); // ← now stable, no infinite loop

  const handleChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Create New Acte
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {fields
        .filter((f: any) => f.field !== "id")
        .map((f: any) => {
          const key = f.field;
          const type = f.type.toLowerCase();

          // ───────────────────────────────────────────
          // DATE CONSTRAINT RULES
          // ───────────────────────────────────────────
          let minDate: string | undefined = undefined;
          let maxDate: string | undefined = undefined;

          // Today's date (for creation limits)
          const today = new Date().toISOString().split("T")[0];

          if (
            key === "date_creation"||
            key === "date_enregistrement"
          ) {
            maxDate = today; // cannot be later than server date
          }

          if (
            key === "date_expiration" ||
            key === "date_entree_vigueur" ||
            key === "date_enregistrement"
          ) {
            // these dates cannot be earlier than date_creation
            const creation = formValues["date_creation"];
            if (creation) {
              minDate = new Date(creation).toISOString().split("T")[0];
            }
          }

          // TextField props
          const extraTextFieldProps = key === "description" 
            ? { multiline: true, minRows: 3, maxRows: 10, sx: { resize: "vertical" } } 
            : {};

          return (
            <FormField
              key={key}
              fieldKey={key}
              fieldType={type}
              value={(formValues as any)[key]}
              onChange={handleChange}
              minDate={minDate}
              maxDate={maxDate}
              textFieldProps={extraTextFieldProps}
            />
          );
        })}

        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
}