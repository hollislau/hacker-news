import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const greeting = 'Hello World';

    return (
      <div className="App">
          <h2>{greeting}</h2>
      </div>
    );
  }
}

export default App;
