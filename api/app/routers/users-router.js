'use strict';

const users = require('express').Router();
const controller = require('./../controllers/user-controller');

users.get('/:username', controller.create);

module.exports = users;