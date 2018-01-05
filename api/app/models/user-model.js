'use strict';

const mongoose = require('../database');
const { Repo } = require('./repo-model');

const UserSchema = new mongoose.Schema({
  username: String,
  repos: [{
    ref: 'Repo',
    type: mongoose.Schema.Types.ObjectId
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };