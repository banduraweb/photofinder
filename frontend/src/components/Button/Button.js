import React from 'react';

import { Button as ButtonMUI } from '@material-ui/core';

export const Button = ({
  variant = 'outlined',
  color = 'primary',
  onClick = () => {},
  size = 'medium',
  type = 'text',
  content = 'Press',
  className = '',
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <ButtonMUI
      variant={variant}
      color={color}
      onClick={onClick}
      size={size}
      type={type}
      className={className}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {content}
    </ButtonMUI>
  );
};
