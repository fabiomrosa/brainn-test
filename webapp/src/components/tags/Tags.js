import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';

import './Tags.css';

export default class Tags extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = { tags: '', isChanged: false };
    this.tagsCancel = this.tagsCancel.bind(this);
    this.tagsSet = this.tagsSet.bind(this);
    this.tagsSubmit = this.tagsSubmit.bind(this);
  }

  tagsCancel(event) {
    event.preventDefault();
    this.props.onCancel();
  }

  tagsSet(event) {
    let tagsValue = event.target.value;
    this.setState({ tags: tagsValue, isChanged: true });
  }

  tagsSubmit(event) {
    event.preventDefault();

    let id = this.props.repo.id;
    let tags = this.state.tags;

    if (!this.state.isChanged) {
      this.setState({ tags: '', isChanged: false });
      this.props.onCancel();
      return;
    }

    tags = tags.toLowerCase();
    tags = tags.replace(/\s/g, '');
    tags = tags.replace(/,/g, ' ');
    tags = tags.trim();
    tags = tags.replace(/\s/g, ',');
    
    axios
      .patch(
        `http://localhost:4000/repos/${id}`, 
        qs.stringify({ tags }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .then(response => {
        if (response.statusText === 'OK') {
          this.props.onUpdate(response.data);
        }
        this.setState({ tags: '', isChanged: false });
        this.props.onCancel();
      })
      .catch(err => {
        this.setState({ tags: '', isChanged: false });
        this.props.onCancel();
      });
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="tags">
        <div className="tags-modal">
          <form method="post" onSubmit={this.tagsSubmit}>
            <div className="tags-modal-form-group">
              <label htmlFor="tags">Edit tags for <strong>{this.props.repo.name}</strong></label>
            </div>
            <div className="tags-modal-form-group">
              <input id="tags" name="tags" type="text" autoComplete="off" tabIndex="0" defaultValue={this.props.repo.tags} onChange={this.tagsSet} />
            </div>
            <div className="tags-modal-form-group tags-modal-form-group--center">
              <button id="save" type="submit">Save</button>
              <button id="cancel" onClick={this.tagsCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}