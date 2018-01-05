'use strict';

const axios = require('axios');
const { Repo } = require('./../models/repo-model');
const { User } = require('./../models/user-model');

const UserController = {
  create(req, res, next) {
    let username = req.params.username;
    User.findOne({ username }).populate('repos')
      .then(user => {
        if (user) {
          return user;
        } else {
          return axios(`https://api.github.com/users/${username}/repos`)
            .then(response => {
              return Repo.insertMany(
                response.data.map(repo => ({
                  id: repo.id,
                  name: repo.name,
                  description: repo.description,
                  language: repo.language,
                  url: repo.html_url,
                  username: username,
                  tags: []
                })
              ));
            })
            .then(repos => {
              return User.create({ username, repos });
            });
        }
      })
      .then(data => res.json(data))
      .catch(err => res.status(404).json(err.response.data.message));
  }
}

module.exports = UserController;