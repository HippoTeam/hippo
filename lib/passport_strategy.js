'use strict';

// TODO: SET THE HTTP PATH ON CALLBACKURL as ENV VARIABLE

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User.js');
var fs = require('fs');
var request = require('superagent');
var Card = require('../models/Card.js');
var getFacebookFriends = require('getFacebookFriends');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID:     process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:  "http://localhost:3000/auth/facebook/callback"
    },
    facebookResponse
  ));
};

function facebookResponse(accessToken, refreshToken, profile, done) {
  User.findOne({facebook_id: profile.id}, function(err, user) {
    if (err) return done('database error');
    //If user is already in the database return the user
    if (user && user.fb_last_update) {
      return done(null, user);
    }

    //Else create the user
    var newUser = new User();
    newUser.facebook_id = profile.id;
    newUser.access_token = accessToken;

    //Populate cards with user's facebook friends
    getFacebookFriends(newUser, null, function(err, res) {
      //If error, continue with saving user
      if (err) { console.log(err); }
      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
          return done('error saving user', null);
        }
        return done(null, user);
      });
    });
  });
}
