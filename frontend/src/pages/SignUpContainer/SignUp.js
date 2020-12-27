import React from 'react';

import {
  Avatar,
  Container,
  Grid,
  Link,
  Box,
  Typography,
} from '@material-ui/core';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Copyright } from '../../components/Copyright/Copyright';
import { Loader } from '../../components/Loader/Loader';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = ({
  handleSubmit,
  handleChange,
  errors,
  loading,
  handleLinkLogin,
  input,
}) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                errors={!!errors.name}
                disabled={loading}
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
                value={input.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                errors={!!errors.email}
                disabled={loading}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={input.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                errors={!!errors.password}
                disabled={loading}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={input.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          {loading && (
            <Grid item container justify="center" alignItems="center">
              <Loader />
            </Grid>
          )}
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            content="submit"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" onClick={handleLinkLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
