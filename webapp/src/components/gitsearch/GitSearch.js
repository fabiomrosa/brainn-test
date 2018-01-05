import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './GitSearch.css';

export default class GitSearch extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.elem = {};
    this.val = {};
    this.state = { search: '' };
    this.searchReset = this.searchReset.bind(this);
    this.searchSet = this.searchSet.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.searchSubmitActive = this.searchSubmitActive.bind(this);
    this.searchSubmitIdle = this.searchSubmitIdle.bind(this);
    this.searchSubmitDisable = this.searchSubmitDisable.bind(this);
    this.searchSubmitEnable = this.searchSubmitEnable.bind(this);
  }

  componentDidMount() {
    this.elem.input = document.getElementById('username');
    this.elem.submit = document.getElementById('submit');
    this.val.minChars = 7;
    this.searchReset();
  }

  searchReset() {
    this.elem.input.style.width = (.6 * this.val.minChars) + 'em';
  }

  searchSet(event) {
    let searchValue = event.target.value;
    let searchChars = searchValue.length;

    if (searchChars) {
      this.searchSubmitEnable();
    } else {
      this.searchSubmitDisable();
    }

    if (searchChars > this.val.minChars) {
      this.elem.input.style.width = (.6 * searchChars) + 'em';
    } else {
      this.elem.input.style.width = (.6 * this.val.minChars) + 'em';
    }

    this.setState({ search: searchValue });
  }

  searchSubmit(event) {
    event.preventDefault();
    if (this.state.search) {
      this.searchSubmitActive();
      this.searchSubmitDisable();
      axios
        .get(`http://localhost:4000/users/${this.state.search}`)
        .then(response => {
          let pathname = `/${this.state.search}`;
          let data = response.data;
          let repos = data.repos;
          if (repos.length) {
            this.context.router.history.push({ pathname, data });
          }
        })
        .catch(err => {
          this.setState({ search: '' });
          this.resetSearch();
          this.searchSubmitIdle();
          this.searchSubmitEnable();
        });
    } else {
      this.searchSubmitIdle();
      this.searchSubmitEnable();
    }
  }

  searchSubmitActive() {
    this.elem.submit.classList.add('active');
  }

  searchSubmitIdle() {
    this.elem.submit.classList.remove('active');
  }

  searchSubmitDisable() {
    this.elem.submit.disabled = true;
  }

  searchSubmitEnable() {
    this.elem.submit.disabled = false;
  }

  render() {
    return (
      <div className="gitsearch">
        <form method="post" onSubmit={this.searchSubmit}>
          <div className="gitsearch-form-group">
            <label htmlFor="username">https://github.com/</label>
            <input id="username" name="username" type="text" autoComplete="off" tabIndex="0" value={this.state.search} onChange={this.searchSet} />
          </div>
          <div className="gitsearch-form-group">
            <button id="submit" disabled>get repositories &#10145;</button>
          </div>
        </form>
      </div>
    );
  }
}