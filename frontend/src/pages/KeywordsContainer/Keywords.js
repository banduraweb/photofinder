import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import JSONPretty from 'react-json-pretty';
import Select from 'react-select';
import { format, parseISO } from 'date-fns';
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
  select: {
    textAlign: 'right',
    padding: theme.spacing(0, 0.5),
  },
  containerSelect: {
    padding: theme.spacing(0, 0, 1),
  },
}));

export const Keywords = ({
  keyWordsList,
  selectOpt,
  selected,
  setSelected,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      ️
      {!!keyWordsList.length && (
        <Grid container alignItems="center" className={classes.containerSelect}>
          <Grid item xs={false} sm={8} className={classes.select}>
            sort by:
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              value={selectOpt.find((el) => el.id === selected)}
              onChange={(e) => {
                setSelected(e.id);
              }}
              name="sortBy"
              required={true}
              options={selectOpt}
              isSearchable={true}
              placeholder="Search or select"
            />
          </Grid>
        </Grid>
      )}
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
                  {format(parseISO(keyword.updatedAt), 'iii MMM do, yyyy')}
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
