import React, { FC } from 'react';

import { TextField } from '@material-ui/core';

let variant: 'outlined' | 'standard' | 'filled' | undefined;
let margin: 'normal' | 'none' | 'dense' | undefined;

type InputProps = {
  variant: typeof variant;
  margin: typeof margin;
  required: boolean;
  fullWidth: boolean;
  id: string;
  label: string;
  name: string;
  autoComplete: string | undefined;
  autoFocus: boolean;
  errors: boolean;
  helperText: string;
  type: string;
  onChange: () => void;
  disabled: boolean;
  value: string;
};

export const Input: FC<InputProps> = ({
  variant = 'outlined',
  margin = 'normal',
  required = true,
  fullWidth = false,
  id = '',
  label = '',
  name = '',
  autoComplete = '',
  autoFocus = true,
  errors = false,
  helperText = '',
  type = 'text',
  onChange = () => {},
  disabled = false,
  value = '',
}) => {
  return (
    <TextField
      variant={variant}
      margin={margin}
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      error={errors}
      helperText={helperText}
      onChange={onChange}
      type={type}
      disabled={disabled}
      value={value}
    />
  );
};
