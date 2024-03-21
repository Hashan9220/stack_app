import 'react-native';
import React from 'react';
import Home from '../src/screen/Home';
import renderer from 'react-test-renderer';

it('function and state test care', () => {
  let HomeData = renderer.create(<Home />).getInstance();

  expect(HomeData.change(2)).toEqual(10);
});
