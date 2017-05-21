import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Table from '.';

describe('Table', () => {
  const props = {
    list: [
      {
        objectID: 'y',
        title: '1',
        author: '1',
        url: '1',
        num_comments: 1,
        points: 2
      },
      {
        objectID: 'z',
        title: '2',
        author: '2',
        url: '2',
        num_comments: 1,
        points: 2
      }
    ],
    onDismiss: () => {}
  };

  it('renders', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Table { ...props } />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Table { ...props } />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
