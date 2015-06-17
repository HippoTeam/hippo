'use strict';

var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  personPic:  String,
  personName: String,
  userId:     String,
  guesses:    { type: Array,  default: [] }
});

module.exports = mongoose.model('Card', cardSchema);
