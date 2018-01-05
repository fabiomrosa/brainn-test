'use strict';

const router = require('express').Router();
const reposRouter = require('./routers/repos-router');
const usersRouter = require('./routers/users-router');

router.use('/repos', reposRouter);
router.use('/users', usersRouter);

module.exports = router;