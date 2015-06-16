'use strict';

var eat      = require('eat'     );
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  eat:          { type: Number                              },
  access_token: {type: String                               },
  facebook_id:  { type: String, required: true, unique: true},
  friends:      { type: Array                               }
});

UserSchema.methods.generateToken = function generateToken(callback) {
  this.eat   = Date.now();
  this.save(function(err, user) {
    if (err) {
      console.log('Error saving new eat in user. Error: ', err);
      return callback(err, null);
    }

    eat.encode({eat: user.eat}, process.env.AUTH_SECRET, function(err, token) {
      if (err) {
        console.log("Error generating token. Error: ", err);
        return callback(err, null);
      }

      callback(null, token);
    });
  });
};

UserSchema.methods.invalidateToken = function invalidateToken(callback) {
  this.eat = null;
  this.save(function(err, user) {
    if (err) {
      console.log('Could not invalidate token. Error: ', err);
      return callback(err, null);
    }
    callback(null, user);
  })
}

module.exports = mongoose.model('User', UserSchema);
