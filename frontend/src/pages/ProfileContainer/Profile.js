import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import JSONPretty from 'react-json-pretty';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export const Profile = ({ user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <JSONPretty id="json-pretty" data={user} />
      </CardContent>
    </Card>
  );
};
