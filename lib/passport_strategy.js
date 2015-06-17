'use strict';

// TODO: SET THE HTTP PATH ON CALLBACKURL as ENV VARIABLE

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User.js');
var fs = require('fs');
var getFacebookFriends = require('./getFacebookFriends');

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
      //If err, console.log on the backend and continue saving user
      if (err) {
        console.log(err);
      }
      //If no error, update fb last update on user
      if (!err) {
        newUser.fb_last_update = Date.now();
      }
      //Save user
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
