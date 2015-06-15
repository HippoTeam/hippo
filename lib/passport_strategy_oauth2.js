'use strict';

// TODO: SET THE HTTP PATH ON CALLBACKURL as ENV VARIABLE

var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/User.js');


module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID:     process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:  "http://localhost:3000/auth/facebook/verification"
    },
    facebookResponse  // see below
  ));
};

function facebookResponse(accessToken, refreshToken, profile, done) {
  // DO A BUNCH OF STUFF HERE WITH RETURNED DATA
  console.log("FACEBOOK RETURNS: AccessToken: ",  accessToken,  " ,",
                                "RefreshToken: ", refreshToken, " ,",
                                "ProfileInfo: ",  profile);
  User.findOrCreate({facebook_id: profile.id}, function(err, user) {
    if (err   ) return done('database error'             );
    if (!user ) return done('error finding/creating user');

    done(null, user); // loads user at req.user
  });
}
