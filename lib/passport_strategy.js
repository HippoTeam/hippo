'use strict';

// TODO: SET THE HTTP PATH ON CALLBACKURL as ENV VARIABLE

var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/User.js');
var fs = require('fs');
var request = require('superagent');
var Card = require('../models/Card.js');

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
  User.findOne({facebook_id: profile.id}, function(err, user) {
    if (err) return done('database error');
    console.log(user);
    if (user) {
      getFacebookFriends(user, null, function() {
        return done(null, user);
      });
      return;
    }

    var newUser = new User();
    newUser.facebook_id = profile.id;
    newUser.access_token = accessToken;

    getFacebookFriends(newUser, null, function(res) {
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

function getFacebookFriends(user, url, callback) {
  url = url || 'https://graph.facebook.com/me/taggable_friends';
  request
   .get(url)
   .query({ access_token: user.access_token })
   .query({ fields: 'name,picture.width(500)' })
   .query({ limit: 5000 })
   .end(function(err, res) {
      if (err) return console.log(err);
      var resData = JSON.parse(res.text);
      var data = resData.data;
      for (var i=0; i<data.length; i++) {
        var newCard = new Card();
        newCard.personName = data[i].name;
        newCard.personPic = data[i].picture.data.url;
        newCard.userId = user.facebook_id;
        newCard.save(function(err, card) {
        });
      }
      if (resData.paging.next) {
        return getFacebookFriends(user, resData.paging.next, callback);
      }
      return callback(res);
   });
}

