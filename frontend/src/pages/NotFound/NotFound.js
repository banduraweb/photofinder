import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { Button } from '../../components/Button/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
  },
  inner: {
    textAlign: 'center',
    height: '170px',
  },
}));

export const NotFound = ({ goHome }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.container}
      justify="center"
      alignItems="center"
    >
      <Grid item container className={classes.inner}>
        <Grid item xs={12}>
          <WarningIcon color="error" fontSize="large" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Not Found 404</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => goHome()} content={'Go home'} />
        </Grid>
      </Grid>
    </Grid>
  );
};
