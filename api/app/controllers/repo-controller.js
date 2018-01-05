'use strict';

const { Repo } = require('./../models/repo-model');

const RepoController = {
  find(req, res, next) {
    let tags = new RegExp(req.query.q, 'g');
    let username = req.query.u;
    Repo.find({ tags, username })
      .then(response => res.json(response))
      .catch(err => res.status(404).json(err.response.data.message));
  },
  get(req, res, next) {
    let id = req.params.id;
    Repo.findOne({ id })
      .then(response => res.json(response))
      .catch(err => res.status(404).json(err.response.data.message));
  },
  update(req, res, next) {
    let id = req.params.id;
    let data = req.body;
    Repo.findOneAndUpdate({ id }, { $set: data }, { new: true })
      .then(response => res.json(response))
      .catch(err => res.status(404).json(err.response.data.message));
  }
}

module.exports = RepoController;