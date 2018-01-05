import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './List.css';

export default class List extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired
  }

  render() {
    return (
      <table className="list">
        <thead>
          <tr>
            <th>Repository</th>
            <th>Description</th>
            <th>Language</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.repos.map((repo) => {
            return (
              <tr key={repo.id}>
                <td><a href={repo.url} target="_blank">{repo.name}</a></td>
                <td>{repo.description}</td>
                <td>{repo.language}</td>
                <td>{repo.tags ? repo.tags.split(',').map(tag => `#${tag} `) : ''}</td>
                <td><button data-repo-id={repo.id} data-repo-name={repo.name} onClick={this.props.onEdit}>edit</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }
}