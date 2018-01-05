'use strict';

const mongoose = require('../database');

const RepoSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  language: String,
  url: String,
  username: String,
  tags: String
});

const Repo = mongoose.model('Repo', RepoSchema);

module.exports = { Repo };