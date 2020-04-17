import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import reducers from '../reducers/index';
import {getArrLogText, getSimpleOperator} from "../reducers/utils";
import {SIMPLE_PLUS, SIMPLE_RESULT} from "../constants";

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});



test('reducers', () => {
  let state;
  state = reducers({input:{output:'0'}}, {type:'onClickNumber',value:9});
  expect(state).toEqual({input:{output:'09'}});
});


test('test getArrLogText', () => {

  expect( getArrLogText( 1.03, 2.32, SIMPLE_PLUS, 3, 4, 5,  SIMPLE_RESULT, "hello" ) ).toEqual(  undefined );
});