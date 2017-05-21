import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from '.';

describe('Button', () => {
  const props = {
    onClick: () => {}
  };

  it('renders', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Button { ...props }>Button</Button>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Button { ...props }>Button</Button>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
