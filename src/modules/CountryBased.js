import React from 'react';
import { Legend, Tooltip, CartesianGrid, Bar, XAxis, YAxis, ComposedChart } from 'recharts';
import Title from '../Title';

export default function CountryBased( props ){
  
  let filteredData = [];

  // Filter and group the data based on country.
  const filterData = ()=>{

    props.peopleData && [...props.peopleData].forEach(_data => {
      // Check if current country has already been iterated and added.
      let currentCountryData = filteredData.find(_filteredData => _filteredData.country === _data.country);

      if( currentCountryData ){
        currentCountryData.score = (currentCountryData.score + _data.score); // Add the current person's score to the previous total.
        currentCountryData.count = ++currentCountryData.count; // Increase the count of occurence
        currentCountryData.average = parseInt((currentCountryData.score) / currentCountryData.count); // Calculate the average and update it.

      } else {
        // If current country has not been added then, set default data and add it.
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

    // Sort the filtered data based on country
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