import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

class App extends Component {
  render() {
    const greeting = 'Hello';
    const user = {
      firstName: 'Asuna',
      lastName: 'Yuki'
    }

    function greetUser(greeting, user) {
      if (user) {
        return greeting + ', ' + user.firstName + ' ' + user.lastName + '!';
      }
      return greeting + ', stranger!';
    }

    return (
      <div className="App">
          <h2>{greetUser(greeting, user)}</h2>
          { list.map(function(item) {
            return <div>{item.title}</div>;
          })}
      </div>
    );
  }
}

export default App;
