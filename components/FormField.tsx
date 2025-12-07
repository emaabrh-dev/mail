// components/FormField.tsx
'use client';

import React from 'react';
import {
  TextField,
  Checkbox,
  InputAdornment,
  TextFieldProps,
  Box,
} from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { SelectField } from './SelectField'; 
import labelsFr from "@/lib/i18n/fr.json";

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const StyledDay = styled(PickersDay)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.light,
  ...theme.applyStyles('light', {
    color: theme.palette.primary.dark,
  }),
}));

export interface FormFieldProps {
  fieldKey: string;
  fieldType: string; // e.g., "string", "text | null", "Date | null", "A | B | null"
  value: any;
  onChange: (key: string, value: any) => void;
  textFieldProps?: Partial<TextFieldProps>;
  datePickerProps?: Partial<DatePickerProps<any>>;
  selectProps?: any; 
  minDate?: string;
  maxDate?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  fieldKey,
  fieldType,
  value,
  onChange,
  textFieldProps = {},
  datePickerProps = {},
  selectProps = {},
  minDate,
  maxDate,
}) => {
  // normalize type for case-insensitive checks
  const normalizedFieldType = fieldType.toLowerCase();

  // treat "text" as "string"
  const normalizedType = normalizedFieldType.replace('text', 'string');

  // check if nullable
  const nullable = normalizedType.split('|').map((t) => t.trim()).includes('null');
  const isNull = value === null;

  const fieldLabel = labelsFr[fieldKey as keyof typeof labelsFr];

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (normalizedType.startsWith('boolean')) {
      onChange(fieldKey, e.target.checked);
      return;
    }

    if (normalizedType.startsWith('number')) {
      const raw = e.target.value;
      if (raw === '' && nullable) return onChange(fieldKey, null);
      return onChange(fieldKey, e.target.valueAsNumber);
    }

    const raw = e.target.value;
    if (raw === '' && nullable) return onChange(fieldKey, null);
    return onChange(fieldKey, raw);
  };

  // detect date field
  const isDate =
    normalizedType === 'date' ||
    normalizedType.includes('date') ||
    normalizedType.includes('date-time') ||
    (normalizedType.includes('string') && fieldKey.toLowerCase().includes('date'));

  // nullable checkbox for input
  const nullableAdornment = nullable ? (
    <InputAdornment position="end">
      <Checkbox
        checked={isNull}
        onChange={(e) => {
          if (e.target.checked) {
            onChange(fieldKey, null);
          } else {
            // restore default value based on type
            if (isDate) onChange(fieldKey, new Date());
            else if (normalizedType.startsWith('number')) onChange(fieldKey, 0);
            else if (normalizedType.startsWith('boolean')) onChange(fieldKey, false);
            else onChange(fieldKey, '');
          }
        }}
        size="small"
      />
    </InputAdornment>
  ) : null;

  // SELECT
  if (normalizedType.startsWith('select')) {
    return (
      <SelectField
        fieldKey={fieldKey}
        label={fieldLabel}
        value={value}
        onChange={(v) => onChange(fieldKey, v)}
        disabled={isNull}
        nullable={nullable}
        {...selectProps}
      />
    );
  }

  // BOOLEAN
  if (normalizedType.startsWith('boolean')) {
    return (
      <Checkbox
        checked={!!value}
        onChange={handleChange}
        disabled={isNull}
        color="primary"
      />
    );
  }

  // DATE
  if (isDate) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <DatePicker
          label={fieldLabel}
          value={isNull ? null : value ? dayjs(value) : null}
          onChange={(newValue: Dayjs | null) => {
            if (!newValue) {
              if (nullable) return onChange(fieldKey, null);
              return;
            }
            onChange(fieldKey, newValue.toDate());
          }}
          disabled={isNull}
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          {...datePickerProps}
          slots={{
            openPickerIcon: EditCalendarRoundedIcon,
            openPickerButton: StyledButton,
            day: StyledDay,
          }}
          slotProps={{
            openPickerIcon: { fontSize: 'large' },
            openPickerButton: { color: 'primary' },
            textField: {
              fullWidth: true,
              ...datePickerProps?.slotProps?.textField,
            },
          }}
        />
        {nullable && (
          <Checkbox
            checked={isNull}
            onChange={(e) => {
              if (e.target.checked) onChange(fieldKey, null);
              else onChange(fieldKey, new Date());
            }}
            size="small"
          />
        )}
      </Box>
    );
  }

  // NUMBER / STRING / TEXT
  return (
    <TextField
      label={fieldLabel}
      type={normalizedType.startsWith('number') ? 'number' : 'text'}
      value={isNull ? '' : value ?? ''}
      onChange={handleChange}
      disabled={isNull}
      fullWidth
      {...textFieldProps}
      slotProps={{
        input: {
          endAdornment: nullableAdornment,
          ...(textFieldProps?.slotProps?.input || {}),
        },
      }}
    />
  );
};