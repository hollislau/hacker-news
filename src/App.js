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
];

const animeList = [
  {
    title: 'Sword Art Online',
    hero: 'Kazuto Kirigaya',
    heroine: 'Asuna Yuki',
    studio: 'A1',
    objectID: 0
  },
  {
    title: 'When Supernatural Battles Became Commonplace',
    hero: 'Andou July',
    heroine: 'Tomoyo Kanzaki',
    studio: 'Trigger',
    objectID: 1
  }
];

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
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          );
        })}
        { animeList.map((item) =>
          <div key={item.objectID}>
            <h3>{item.title}</h3>
            <p>Lead characters: {item.hero} and {item.heroine}</p>
            <p>Studio: {item.studio}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
