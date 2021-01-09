import React, { FC } from 'react';

import { Button as ButtonMUI, ButtonProps } from '@material-ui/core';

interface IProps extends ButtonProps {
  content: string;
}
export const Button: FC<IProps> = ({
  variant = 'outlined',
  color = 'primary',
  onClick = () => {},
  size = 'medium',
  content = 'Press',
  className = '',
  type = undefined,
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <ButtonMUI
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      size={size}
      className={className}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {content}
    </ButtonMUI>
  );
};
