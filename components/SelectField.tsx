// components/SelectField.tsx
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SelectFieldProps<T> {
  value: T | null;
  onChange: (value: T) => void;
  options: { id: T; label: string }[];
  label?: string;
}

export function SelectField<T extends string | number>({
  value,
  onChange,
  options,
  label = "Select",
}: SelectFieldProps<T>) {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value ?? ""}
        label={label}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}