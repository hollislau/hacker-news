import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from '.';

describe('Button', () => {
  it('renders', () => {
    const div = document.createElement('div');
    const onClick = () => {};

    ReactDOM.render(
      <Button onClick={ onClick }>
        Button
      </Button>,
      div
    );
  });

  test('snapshots', () => {
    const onClick = () => {};
    const component = renderer.create(
      <Button onClick={ onClick }>
        Button
      </Button>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
