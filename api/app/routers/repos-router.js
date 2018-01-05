'use strict';

const repos = require('express').Router();
const controller = require('./../controllers/repo-controller');

repos.get('/', controller.find);
repos.get('/:id', controller.get);
repos.patch('/:id', controller.update);

module.exports = repos;