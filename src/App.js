import React, { Component } from 'react';
import './App.css';

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
      </div>
    );
  }
}

export default App;
