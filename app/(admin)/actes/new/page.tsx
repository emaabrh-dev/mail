'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import type { ActeCreate } from '@/lib/client/schemas/acteCreate';

type ActeCreateKeys = keyof ActeCreate;

export default function NewActePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle form submission, e.g., call API
    console.log({ title, description });
    alert('Acte created: ' + title);
    setTitle('');
    setDescription('');
  };

  return (
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Create New Acte
          {ActeCreateKeys.map(prop => ({
            name: prop.getName(),
            type: prop.getType().getText(),
            }))}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            required
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
  );
}
