import React, { Component } from 'react';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../../constants';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    }
  }

  setTopStories = (result) => {
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

  fetchTopStories = (searchTerm, page) => {
    fetch(`${ PATH_BASE }${ PATH_SEARCH }?${ PARAM_SEARCH }${ searchTerm }&${ PARAM_PAGE }${ page }&${ PARAM_HPP }${ DEFAULT_HPP }`)
      .then(res => {
        if (res.ok) return res.json();

        throw new Error('Network response not okay!');
      })
      .then(result => this.setTopStories(result))
      .catch(err => console.log(`Fetch error: ${ err.message }`));
  }

  shouldFetchTopStories = searchTerm => !this.state.results[searchTerm.toLowerCase()];

  onDismiss = id => {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange = e => this.setState({ searchTerm: e.target.value });

  onSearchSubmit = e => {
    const { searchTerm } = this.state;

    if (this.shouldFetchTopStories(searchTerm)) {
      this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    }

    this.setState({ searchKey: searchTerm.toLowerCase() });
    e.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    this.setState({ searchKey: searchTerm.toLowerCase() });
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
          <Button onClick={ () => this.fetchTopStories(searchKey, page + 1) }>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
