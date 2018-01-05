import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Filter from '../components/filter/Filter';
import List from '../components/list/List';
import Tags from '../components/tags/Tags';

export default class Repos extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.elem = {};
    this.state = { repos: [], repo: {}, tags: [], isEditing: false };
    this.reposTagsCancel = this.reposTagsCancel.bind(this);
    this.reposTagsEdit = this.reposTagsEdit.bind(this);
    this.reposTagsFilter = this.reposTagsFilter.bind(this);
    this.reposTagsUpdate = this.reposTagsUpdate.bind(this);
  }

  componentDidMount() {
    let data = this.props.location.data;
    let username = this.props.match.params.id;
    if (data) {
      let repos = data.repos;
      this.setState({ repos, username });
    } else {
      
      axios
        .get(`http://localhost:4000/users/${username}`)
        .then(response => {
          let data = response.data;
          let repos = data.repos;
          if (repos.length) {
            this.setState({ repos, username });
          } else {
            throw new Error('No repos available!');
          }
        })
        .catch(err => {
          this.context.router.history.push({ pathname: '/' });
        });
    }
  }

  reposTagsCancel() {
    this.elem.edit.classList.remove('active', 'loading');
    this.setState({isEditing: false});
  }

  reposTagsEdit(event) {
    this.elem.edit = event.target;
    this.elem.edit.classList.add('active', 'loading');

    let id = this.elem.edit.dataset.repoId;
    let name = this.elem.edit.dataset.repoName;
    
    axios
      .get(`http://localhost:4000/repos/${id}`)
      .then(response => {
        let tags = response.data.tags;
        this.setState({ repo: { id, name, tags }, isEditing: true });
      })
      .catch(err => {
        console.log(err)
      });
  }

  reposTagsFilter(repos) {
    this.setState({ repos });
  }

  reposTagsUpdate(repoEdited) {
    // BRACE YOURSELVES. GAMBIS DETECTED
    let repos = this.state.repos;
    let index = repos.findIndex(repo => repo.id === repoEdited.id);

    repos[index] = repoEdited;

    this.setState({ repos });
  }

  render() {
    return (
      <div>
        <Filter username={this.state.username} onFilter={this.reposTagsFilter} />
        <List repos={this.state.repos} onEdit={this.reposTagsEdit} />
        <Tags repo={this.state.repo} show={this.state.isEditing} onCancel={this.reposTagsCancel} onUpdate={this.reposTagsUpdate} />
      </div>
    );
  }
}