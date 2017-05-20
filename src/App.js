import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'Redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const largeColumn = { width: '40%' };
const midColumn = { width: '30%' };
const smallColumn = { width: '10%' };

const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={ onClick }
    className={ className }
    type="button"
  >
    { children }
  </button>

const Search = ({ value, onChange, children }) =>
  <form>
    { children }
    <input
      type="text"
      value={ value }
      onChange={ onChange }
    />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map((item) =>
      <div
        key={ item.objectID }
        className="table-row"
      >
        <span style={ largeColumn }>
          <a
            href={ item.url }
            target="_blank"
          >
            { item.title }
          </a>
        </span>
        <span style={ midColumn }>{ item.author }</span>
        <span style={ smallColumn }>{ item.num_comments }</span>
        <span style={ smallColumn }>{ item.points }</span>
        <span style={ smallColumn}>
          <Button
            onClick={ () => onDismiss(item.objectID) }
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
  }

  setSearchTopStories = result => this.setState({ result });

  fetchSearchTopStories = searchTerm => {
    fetch(`${ PATH_BASE }${ PATH_SEARCH }?${ PARAM_SEARCH }${ searchTerm }`)
      .then(res => {
        if (res.ok) return res.json();

        throw new Error('Network response not okay!');
      })
      .then(data => this.setSearchTopStories(data))
      .catch(err => console.log(`Fetch error: ${ err.message }`));
  }

  onDismiss = id => {
    const { result } = this.state;
    const isNotId = item => item.objectID !== id;
    const updatedList = result.hits.filter(isNotId);

    this.setState({
      result: { ...result, hits: updatedList }
    });
  }

  onSearchChange = event => this.setState({ searchTerm: event.target.value });

  componentDidMount() {
    const { searchTerm } = this.state;

    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const { result, searchTerm } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={ searchTerm }
            onChange={ this.onSearchChange }
          >
            Search
          </Search>
        </div>
        { result &&
          <Table
            list={ result.hits }
            pattern={ searchTerm }
            onDismiss={ this.onDismiss }
          />
        }
      </div>
    );
  }
}

export default App;
