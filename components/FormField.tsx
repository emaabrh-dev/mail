'use client';

import React from 'react';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

export interface FormFieldProps {
  fieldKey: string;
  fieldType: string;
  value: any;
  onChange: (key: string, value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  fieldKey,
  fieldType,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldType === 'boolean' || fieldType === 'boolean | null') {
      onChange(fieldKey, e.target.checked);
    } else if (fieldType === 'number' || fieldType === 'number | null') {
      onChange(fieldKey, e.target.valueAsNumber);
    } else {
      onChange(fieldKey, e.target.value);
    }
  };

  // Render based on type
  if (fieldType === 'boolean' || fieldType === 'boolean | null') {
    return (
      <FormControlLabel
        control={<Checkbox checked={!!value} onChange={handleChange} />}
        label={fieldKey}
      />
    );
  }

  if (fieldType === 'Date' || fieldType === 'Date | null' || fieldType === 'string | null') {
    return (
      <DatePicker
        label={fieldKey}
        value={value ? dayjs(value) : null}
        onChange={(newValue: Dayjs | null) =>
          onChange(fieldKey, newValue ? newValue.toDate() : null)
        }
        slotProps={{ textField: { fullWidth: true } }}
      />
    );
  }

  if (fieldType === 'number' || fieldType === 'number | null') {
    return (
      <TextField
        label={fieldKey}
        type="number"
        value={value ?? ''}
        onChange={handleChange}
      />
    );
  }

  // Default: text input
  return <TextField label={fieldKey} value={value || ''} onChange={handleChange} />;
};
