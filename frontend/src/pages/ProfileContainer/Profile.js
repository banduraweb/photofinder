import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import JSONPretty from 'react-json-pretty';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import Grid from '@material-ui/core/Grid';
import { inputErrorsNormalize } from '../../heplers/inputErrorsNormalize';
import { Loader } from '../../components/Loader/Loader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Profile = ({
  user,
  loading,
  errors,
  input,
  handleChange,
  handleSubmit,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <JSONPretty id="json-pretty" data={user} />
      </CardContent>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center">
            <AccountCircleIcon />
            <Typography>Change password</Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={false} md={4}>
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Input
                  disabled={loading}
                  errors={!!errors.oldPassword}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="oldPassword"
                  label="old password"
                  name="oldPassword"
                  autoComplete="password"
                  autoFocus
                  onChange={handleChange}
                  helperText={inputErrorsNormalize(errors.oldPassword)}
                  value={input.oldPassword}
                  type="password"
                />
                <Input
                  disabled={loading}
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
                  disabled={loading}
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
              </form>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};
