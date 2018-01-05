'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/brainn', { useMongoClient: true });

module.exports = mongoose;