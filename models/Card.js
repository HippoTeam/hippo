'use strict';

var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  personPic:  String,
  personName: String,
  userId:     String,
  guesses:    { type: Array,  default: []  },
  mem_rate:   { type: Number, default: 0 }
});

module.exports = mongoose.model('Card', cardSchema);
