import React, { useState } from 'react';
import { LineChart, Line, Legend, Tooltip, CartesianGrid, Bar, XAxis, YAxis, Area, ComposedChart } from 'recharts';
import Title from '../Title';
import { makeStyles } from '@material-ui/styles';

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

export default function CountryBased( props ){
  
  const {peopleData} = props;
  const [data, setData] = useState();
  let filteredData = [];

  const filterData = ()=>{

    props.peopleData && [...props.peopleData].forEach(_data => {
        
        let thisCountry = filteredData.find(_country => _country.country === _data.country);

        if( thisCountry ){
          
          thisCountry.score = (thisCountry.score + _data.score);
          thisCountry.count = ++thisCountry.count;
          thisCountry.average = parseInt((thisCountry.score + _data.score)/++thisCountry.count);

        } else {

          filteredData = [
            ...filteredData,
            {
            score : _data.score === null ? 0 : _data.score,
            count : 1,
            country : _data.country,
            average : _data.score === null ? 0 : _data.score
          }];
        }
      });

    filteredData.sort(function(a, b) { 
      if( a.country > b.country){
        return 1;
      } else {
        return -1;
      }
    });

  };

  filterData();
  
  return (
    <React.Fragment>
      <Title>Scores by Country</Title>
      <ComposedChart
        layout="vertical"
        width={500}
        height={3500}
        data={filteredData}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="country" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="average" barSize={10} fill="#413ea0" />
      </ComposedChart>
    </React.Fragment>
  );
}