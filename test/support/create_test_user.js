'use strict';

var assert = require('assert');
var User   = require('../../models/User.js');


// Creates a user and token
// Passes callback the user & token

module.exports = function createUserAndEat(callback) {
  var userInfo = {access_token: '1234abcd', facebook_id: '1234'};
  var newUser  = new User(userInfo);
  newUser.save(function(err, user) {
    console.log(err);
    assert.equal(err, null);
    user.generateToken(function(error, token) {
      assert.equal(error, null);
      callback(user, token);
    });
  });
}
