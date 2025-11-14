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
  fieldType: string; // e.g., "string", "string | null", "Date | null", "A | B | null"
  value: any;
  onChange: (key: string, value: any) => void;
  textFieldProps?: Partial<TextFieldProps>; // extra props for TextField
  datePickerProps?: Partial<DatePickerProps<any>>; // extra props for DatePicker
}

export const FormField: React.FC<FormFieldProps> = ({
  fieldKey,
  fieldType,
  value,
  onChange,
  textFieldProps = {},
  datePickerProps = {},
}) => {
  // AUTO-DETECT NULLABLE
  const nullable = fieldType.split('|').map((t) => t.trim()).includes('null');
  const isNull = value === null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldType.startsWith('boolean')) {
      onChange(fieldKey, e.target.checked);
      return;
    }

    if (fieldType.startsWith('number')) {
      const raw = e.target.value;
      if (raw === '' && nullable) return onChange(fieldKey, null);
      return onChange(fieldKey, e.target.valueAsNumber);
    }

    const raw = e.target.value;
    if (raw === '' && nullable) return onChange(fieldKey, null);
    return onChange(fieldKey, raw);
  };

  // Detect date field
  const isDate =
    fieldType === 'Date' ||
    fieldType.includes('Date') ||
    fieldType.includes('date-time') ||
    (fieldType.includes('string') && fieldKey.toLowerCase().includes('date'));

  // Nullable checkbox inside input
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
            else if (fieldType.startsWith('number')) onChange(fieldKey, 0);
            else if (fieldType.startsWith('boolean')) onChange(fieldKey, false);
            else onChange(fieldKey, '');
          }
        }}
        size="small"
      />
    </InputAdornment>
  ) : null;

  // BOOLEAN
  if (fieldType.startsWith('boolean')) {
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
          label={fieldKey}
          value={isNull ? null : value ? dayjs(value) : null}
          onChange={(newValue: Dayjs | null) => {
            if (!newValue) {
              if (nullable) return onChange(fieldKey, null);
              return;
            }
            onChange(fieldKey, newValue.toDate());
          }}
          disabled={isNull}
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

  // NUMBER / STRING
  return (
    <TextField
      label={fieldKey}
      type={fieldType.startsWith('number') ? 'number' : 'text'}
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
