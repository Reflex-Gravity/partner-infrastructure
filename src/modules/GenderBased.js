import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { PieChart, Pie, Sector, Cell } from "recharts"
import Title from '../Title';
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

export default function GenderBased( props ){

  const classes = useStyles();
  const [activeIndex, setActiveIndex] = React.useState(0);
  let filteredData = [];

  const filterData = (props) => {
    props.peopleData && [...props.peopleData].forEach(_data => {
       // Check if current gender has already been iterated and added.
      let currentGenderData = filteredData.find(_filteredData => _filteredData.gender === _data.gender);

      if (currentGenderData) {

        currentGenderData.score = (currentGenderData.score + _data.score); // Add the current person's score to the previous total.
        currentGenderData.count = ++currentGenderData.count; // Increase the count of occurence
        currentGenderData.average = parseInt(currentGenderData.score / currentGenderData.count);  // Calculate the average and update it.

      } else {
         // If current gender has not been added then, set default data and add it.
        filteredData = [
          ...filteredData,
          {
            count: 1,
            name: _data.gender,
            gender: _data.gender,
            score: _data.score === null ? 0 : _data.score,
            average: _data.score === null ? 0 : _data.score,
          }
        ];
      }
    });

  };

  filterData(props);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };
                    
  const renderActiveShape = (props) => {

    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name === null ? "N/A" : payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          fill={fill}
          endAngle={endAngle}
          startAngle={startAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />
        <Sector
          cx={cx}
          cy={cy}
          endAngle={endAngle}
          startAngle={startAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Average is ${value}`}</text>
      </g>
    );
  };

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12}>
        <Paper className={clsx(classes.paper)}>
          <Title>Scores by Gender</Title>
          <PieChart width={800} height={400}>
            <Pie
              cx={300}
              cy={200}
              fill="#8884d8"
              innerRadius={60}
              outerRadius={80}
              dataKey="average"
              data={filteredData}
              activeIndex={activeIndex}
              onMouseEnter={onPieEnter}
              activeShape={renderActiveShape}
            />
          </PieChart>
        </Paper>
      </Grid>
    </Grid>
  )
}