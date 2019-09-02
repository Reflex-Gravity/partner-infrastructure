import React from 'react';
import renderer from 'react-test-renderer'
import GenderBased from '../GenderBased';

import {peopleData} from '../../peopleData'

it(' renders countryBased component correctly', ()=>{
  const tree = renderer
                .create(
                  <GenderBased peopleData={peopleData}/>
                )
                .toJSON();
      expect(tree).toMatchSnapshot();
});