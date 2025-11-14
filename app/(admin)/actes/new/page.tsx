'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { acteCreateFields } from '@/lib/client/schemas/acteCreate.runtime';
import { ActeCreate } from '@/lib/client/schemas';
import { FormField } from '@/components/FormField';

export default function NewActePage() {
  const [formValues, setFormValues] = useState<Partial<ActeCreate>>({});

  const handleChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    alert('Acte created: ' + JSON.stringify(formValues, null, 2));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Create New Acte
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {acteCreateFields.map(({ key, type }) => (
          <FormField
            key={key}
            fieldKey={key}
            fieldType={type}
            value={(formValues as any)[key]}
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
