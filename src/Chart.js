import React, { useState} from 'react';
import { LineChart, Line, Legend, Tooltip, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// // Generate Data
// function createData(country, score, count) {
//   return { country, score, count };
// }

// // const data = [
// //   createData('DE', 79),
// //   createData('UK', 63),
// //   createData('FR', 76),
// //   createData('ES', 68),
// //   createData('NL', 90),
// //   createData('IT', 55),
// //   createData('AU', undefined),
// // ];

function Chart( props ) {

  const [data, setData] = useState();
  let filteredData = [];

  const filterData = (peopleData)=>{
    peopleData && [...peopleData].forEach( _data => {
        
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

  filterData(props.peopleData);
  
  return (
    <React.Fragment>
      <Title>Score statistics</Title>
      <ResponsiveContainer>
        <LineChart
          data = {
            filteredData
          }
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Tooltip/>
          <Legend/>
          <XAxis dataKey="country"/>
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Average score
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="average" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default React.memo(Chart)