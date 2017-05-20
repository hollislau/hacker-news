import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'Redux';
const DEFAULT_PAGE = '0';
const DEFAULT_HPP = '50';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const largeColumn = { width: '40%' };
const midColumn = { width: '30%' };
const smallColumn = { width: '10%' };

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={ onClick }
    className={ className }
    type="button"
  >
    { children }
  </button>

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={ onSubmit }>
    <input
      type="text"
      value={ value }
      onChange={ onChange }
    />
    <button type="submit">
      { children }
    </button>
  </form>

const Table = ({ list, onDismiss }) =>
  <div className="table">
    { list.map((item) =>
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
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    }
  }

  setSearchTopStories = (result) => {
    const { searchKey, results } = this.state;
    const { hits, page } = result;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearchTopStories = (searchTerm, page) => {
    fetch(`${ PATH_BASE }${ PATH_SEARCH }?${ PARAM_SEARCH }${ searchTerm }&${ PARAM_PAGE }${ page }&${ PARAM_HPP }${ DEFAULT_HPP }`)
      .then(res => {
        if (res.ok) return res.json();

        throw new Error('Network response not okay!');
      })
      .then(result => this.setSearchTopStories(result))
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

  onSearchChange = e => this.setState({ searchTerm: e.target.value });

  onSearchSubmit = e => {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    e.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  render() {
    const { results, searchKey, searchTerm } = this.state;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={ searchTerm }
            onChange={ this.onSearchChange }
            onSubmit={ this.onSearchSubmit }
          >
            Search
          </Search>
        </div>
        <Table
          list={ list }
          onDismiss={ this.onDismiss }
        />
        <div className="interactions">
          <Button onClick={ () => this.fetchSearchTopStories(searchKey, page + 1) }>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
