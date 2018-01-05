'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const db = require('./app/database');
const router = require('./app/router');

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.get('/', (req, res) => {
  res.json({});
});

app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`);
});