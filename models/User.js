'use strict';

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  eat:            { type: Number                               },
  access_token:   { type: String                               },
  facebook_id:    { type: String, required: true, unique: true },
  fb_last_update: { type: Date,                                }
});

module.exports = mongoose.model('User', UserSchema);
