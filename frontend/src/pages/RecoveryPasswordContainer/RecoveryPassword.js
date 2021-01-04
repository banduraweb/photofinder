import React from 'react';
import { Grid, Box, Paper, Link, Avatar, Typography } from '@material-ui/core';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { makeStyles } from '@material-ui/core/styles';
import { Copyright } from '../../components/Copyright/Copyright';
import { Loader } from '../../components/Loader/Loader';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { inputErrorsNormalize } from '../../heplers/inputErrorsNormalize';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  warning: {
    color: theme.palette.secondary.main,
  },
}));

export const RecoveryPassword = ({
  handleSubmit,
  handleChange,
  errors,
  loading,
  input,
  goHome,
  errorId,
}) => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            FORGOT PASSWORD
          </Typography>
          {errorId && (
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.warning}
            >
              <Typography component="h1" variant="h5">
                Link is not valid
              </Typography>
            </Grid>
          )}
          {errors.serverError && (
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.warning}
            >
              <Typography component="h1" variant="h5">
                {errors.serverError}
              </Typography>
            </Grid>
          )}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Input
              disabled={errorId || loading}
              errors={!!errors.newPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="new password"
              name="newPassword"
              autoFocus
              onChange={handleChange}
              helperText={inputErrorsNormalize(errors.newPassword)}
              value={input.newPassword}
              type="password"
            />
            <Input
              disabled={errorId || loading}
              errors={!!errors.confirmedNewPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmedNewPassword"
              label="confirm new password"
              name="confirmedNewPassword"
              autoFocus
              onChange={handleChange}
              helperText={inputErrorsNormalize(errors.confirmedNewPassword)}
              value={input.confirmedNewPassword}
              type="password"
            />
            <Grid container>
              <Grid item>
                <Link onClick={goHome} variant="body2">
                  <Grid container alignItems="center">
                    <Grid item>
                      <ArrowBackIcon />
                    </Grid>
                    <Grid item>Generate new recovery link</Grid>
                  </Grid>
                </Link>
              </Grid>
            </Grid>
            {loading && (
              <Grid item container justify="center" alignItems="center">
                <Loader />
              </Grid>
            )}
            <Button
              disabled={errorId || loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              content="change password"
            />
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
