import React from 'react';
import renderer from 'react-test-renderer'
import CountryBased from '../CountryBased';

import {peopleData} from '../../peopleData'

it(' renders countryBased component correctly for NONE sortType', ()=>{
  const tree = renderer
                .create(
                  <CountryBased peopleData={peopleData}/>
                )
                .toJSON();
  expect(tree).toMatchSnapshot();
});