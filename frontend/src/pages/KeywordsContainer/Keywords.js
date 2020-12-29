import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import JSONPretty from 'react-json-pretty';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1, 20),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 0.5),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const Keywords = ({ keyWordsList }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {keyWordsList.map((keyword) => (
        <Accordion key={keyword.createdAt}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.heading}>
                  {keyword?.keyword?.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.heading}>
                  {new Date(keyword.updatedAt).toDateString()}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item xs={12}>
              <JSONPretty id="json-pretty" data={keyword} />
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
