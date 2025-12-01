"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ActeCreate } from "@/lib/client/schemas";
import { FormField } from "@/components/FormField";
import { getTables } from "@/lib/client/endpoints";

type ColumnSchema = {
  field: keyof ActeCreate;
  label: string;
  type: string;
};

export default function NewActePage() {
  const tablesApi = getTables();

  const [formValues, setFormValues] = useState<Partial<ActeCreate>>({});
  const [fields, setFields] = useState<ColumnSchema[]>([]);

  // ---------------------------------------
  // 🔹 Load columns for "actes"
  // ---------------------------------------
  useEffect(() => {
    async function loadColumns() {
      try {
        const params = { gn: "actes" };
        const res = await tablesApi.getColumnsAllApiTablesColumnsGet(params);

        // The backend returns an object like: { actes: [ ...columns ] }
        const gridColumns: ColumnSchema[] = res.data["actes"] || [];

        setFields(
          gridColumns.map((col) => ({
            field: col.field as keyof ActeCreate,
            label: col.label,
            type: col.type,
          }))
        );
      } catch (err) {
        console.error("Error loading columns:", err);
      }
    }

    loadColumns();
  }, [tablesApi]);

  const handleChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    alert("Acte created: " + JSON.stringify(formValues, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Create New Acte
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {fields.map(({ field, type, label }) => (
          <FormField
            key={field as string}
            fieldKey={field}
            fieldType={type}
            label={label}
            value={(formValues as any)[field]}
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