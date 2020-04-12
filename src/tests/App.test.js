import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import reducers from '../reducers/index1';

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