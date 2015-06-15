'use strict';

var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  personPic: String,
  personName: String
});

module.exports = mongoose.model('Card', cardSchema);
