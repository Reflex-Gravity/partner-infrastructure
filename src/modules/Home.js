import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import ScoreTable from '../ScoreTable';
import Chart from '../Chart';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Home( props ){
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Chart
            peopleData  = { [...props.peopleData] }
          />
        </Paper>
      </Grid>
      {/* Recent scores */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ScoreTable
            peopleData = { [...props.peopleData] }
          />
        </Paper>
      </Grid>
    </Grid>
  )
}