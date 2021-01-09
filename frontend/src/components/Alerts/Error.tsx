import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '282px',
    paddingLeft: theme.spacing(2),
    wordBreak: 'break-word',
  },
}));

export const Error: FC<AlertProps> = ({ message }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>{message}</div>
    </div>
  );
};
