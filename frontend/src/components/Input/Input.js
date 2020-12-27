import React from 'react';

import { TextField } from '@material-ui/core';

export const Input = ({
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
