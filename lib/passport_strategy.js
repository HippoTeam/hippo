'use strict';

// TODO: SET THE HTTP PATH ON CALLBACKURL as ENV VARIABLE

var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/User.js');
var fs = require('fs');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID:     process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:  "http://localhost:3000/auth/facebook/callback"
    },
    facebookResponse  // see below
  ));
};


function saveResponse(accessToken, refreshToken, profile) {
  fs.writeFile('../db/oauth_fb_response', {
    accessToken:  accessToken,
    refreshToken: refreshToken,
    profile:      profile
  });
}


function facebookResponse(accessToken, refreshToken, profile, done) {
  // DO A BUNCH OF STUFF HERE WITH RETURNED DATA
  console.log("FACEBOOK RETURNS: AccessToken: ",  accessToken,  " ,",
                                "RefreshToken: ", refreshToken, " ,",
                                "ProfileInfo: ",  profile);

  User.find({facebook_id: profile.id}, function(err, user) {
    if (err ) return done('database error');
    if (user) return done(null, user);         // if user, load req.user

    var newUser            = new User();
    // TO BE REMOVED & LOCATED ON CLIENT - ENCRYPTED IN COOKIE
    newUser.access_token   = accessToken;
    //userUser.username    = profile.name.givenName;    // their first name
    //newUser.facebook.email = profile.emails[0].value; // email for contact

    newUser.save(function(err, user) {
      if (err) return done('error saving user', null);

      return done(null, user);
    });
  });
}
