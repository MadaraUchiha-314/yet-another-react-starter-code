import React from 'react';
import renderer from 'react-test-renderer';

import HomePage from 'src/js/widgets/homepage/Homepage';

it('renders correctly', () => {
  const tree = renderer
    .create(<HomePage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
