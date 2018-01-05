import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Filter.css';

export default class Filter extends Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.elem = {};
    this.state = { filter: '' };
    this.filterSet = this.filterSet.bind(this);
    this.filterSubmit = this.filterSubmit.bind(this);
    this.filterSubmitActive = this.filterSubmitActive.bind(this);
    this.filterSubmitIdle = this.filterSubmitIdle.bind(this);
    this.filterSubmitDisable = this.filterSubmitDisable.bind(this);
    this.filterSubmitEnable = this.filterSubmitEnable.bind(this);
  }

  componentDidMount() {
    this.elem.input = document.getElementById('filter-input');
    this.elem.submit = document.getElementById('filter-submit');
  }

  filterSet(event) {
    let input = event.target;
    let value = input.value;
    this.setState({ filter: value });
  }

  filterSubmit(event) {
    event.preventDefault();

    let filter = this.state.filter;
    let username = this.props.username;
    
    this.filterSubmitActive();
    this.filterSubmitDisable();
    
    axios.get(`http://localhost:4000/repos?q=${filter}&u=${username}`)
      .then(response => {
        this.filterSubmitIdle();
        this.filterSubmitEnable();
        this.props.onFilter(response.data);
      })
      .catch(err => {
        this.filterSubmitIdle();
        this.filterSubmitEnable();
      });
  }
  
  filterSubmitActive() {
    this.elem.submit.classList.add('active');
  }

  filterSubmitIdle() {
    this.elem.submit.classList.remove('active');
  }

  filterSubmitDisable() {
    this.elem.submit.disabled = true;
  }

  filterSubmitEnable() {
    this.elem.submit.disabled = false;
  }

  render() {
    return (
      <div className="filter">
        <form method="get" onSubmit={this.filterSubmit}>
          <input id="filter-input" name="filter" type="text" autoComplete="off" placeholder="Type a tag" value={this.state.filter} onChange={this.filterSet} />
          <button id="filter-submit">Search</button>
        </form>
      </div>
    );
  }
}