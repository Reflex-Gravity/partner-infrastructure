import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import Utils from '../utils/Utils'
import ScoreTable from '../ScoreTable';
import {peopleData} from '../peopleData'

Enzyme.configure({adapter: new Adapter()})

it(' renders countryBased component correctly', ()=>{
  const tree = renderer
                .create(
                  <ScoreTable peopleData={peopleData}/>
                )
                .toJSON();
      expect(tree).toMatchSnapshot();
});

test('check search filter', ()=>{

  const search = Utils.filterArrayByString([...peopleData], "first_name", "murdock");
  
  expect(search).toEqual([{
    "id": "a67e6828-99d9-4d8d-9cd7-8aff12e95973",
    "first_name": "Murdock",
    "last_name": "Ledstone",
    "email": "mledstone0@mayoclinic.com",
    "gender": "Male",
    "city": "Olofström",
    "country": "SE",
    "score": null,
    "created_at": "2017-04-05T02:28:37Z"
  }])

})