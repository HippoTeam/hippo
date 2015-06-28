'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');

module.exports = function(app, passport) {
  app.use(bodyparser.json());

  // Facebook
  app.get('/auth/facebook',
    //Replace next two lines with commented lines below to remove backdoor
    userBackdoor,
    successMiddleware
    // passport.authenticate('facebook',
    //   { session: false,
    //     scope: ['user_friends']
    //   }
    // )
  );

 // Facebook Frontdoor
  app.get('/auth/facebook/frontdoor',
    passport.authenticate('facebook',
      { session: false,
        scope: ['user_friends']
      }
    )
  );

  // Redirect
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook',
      { session:         false,
        failureRedirect: '/#/login'
      }),
    successMiddleware
  );

  function successMiddleware(req, res, next) {
    req.user.generateToken(function(err, token) {
      if (err) {
        console.log('Error generating token. Error: ', err);
        return res.status(500).json({error: true, msg: 'internal server error'});
      }

      token = encodeURIComponent(token);
      res.redirect('/#/auth?token=' + token);
    });
  }

  //Backdoor to allow anyone to use app
  function userBackdoor(req, res, next) {
    //Find my user and send that back
    User.findOne({facebook_id: '10105125701719480'}, function(err, user) {
      if (err) return done('database error');
      //If user is already in the database return the user
      if (user && user.fb_last_update) {
        req.user = user;
      }
      next();
    });
  }
};


