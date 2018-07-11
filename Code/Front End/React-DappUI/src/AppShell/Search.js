import React, { Component } from "react";
//import BaseComponent from './BaseComponent';
//const EventEmitter = require('EventEmitter');
import EventManager from '../services/EventManager';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSearch: false
    };
  }

  onChange = event => {
    const searchText = event.target.value;
    if (searchText !== "") {
      this.setState({ enableSearch: true });
    }
  };

  onSearch = event => {
    event.preventDefault();
    const searchText = this.inputSearch.value;
    // fire an event
    EventManager.EE.emit('search',{
        entity:'',
        query:searchText
    });
  };

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSearch}>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          onChange={this.onChange}
          ref={node => (this.inputSearch = node)}
        />
        <button
          className="btn btn-success"
          type="submit"
          disabled={!this.state.enableSearch}
        >
          Search
        </button>
      </form>
    );
  }
}
