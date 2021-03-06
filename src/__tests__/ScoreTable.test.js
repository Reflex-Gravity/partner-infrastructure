import React from 'react';
import renderer from 'react-test-renderer'

import Utils from '../utils/Utils'
import ScoreTable from '../ScoreTable';
import {peopleData} from '../peopleData'

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