import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Search from '.';

describe('Search', () => {
  it('renders', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Search
        value=""
        onChange={ () => {} }
        onSubmit={ () => {} }
      >
        Search
      </Search>,
      div
    );
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Search
        value=""
        onChange={ () => {} }
        onSubmit={ () => {} }
      >
        Search
      </Search>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
