'use strict';

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  eat:          { type: Number                              },
  access_token: {type: String                               },
  facebook_id:  { type: String, required: true, unique: true},
  friends:      { type: Array                               }
});

module.exports = mongoose.model('User', UserSchema);
