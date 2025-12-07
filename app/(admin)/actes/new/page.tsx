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
        {fields.map((f: any) => (
          <FormField
            key={f.field}
            fieldKey={f.field}
            fieldType={f.type}
            label={f.label}
            value={(formValues as any)[f.field]}
            onChange={handleChange}
          />
        ))}

        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
}