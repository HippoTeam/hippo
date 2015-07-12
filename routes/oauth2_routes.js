'use strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');

module.exports = function(app, passport) {
  app.use(bodyparser.json());

  // Facebook
  app.get('/auth/facebook/:name?',
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
    var username = (req.params.name ? req.params.name.toLowerCase() : 'kumar'); // uppercase or default
    var facebookId = {
      jowell: process.env.JOWELL,
      lamson: process.env.LAMSON,
      kumar:  process.env.KUMAR,
      clint:  process.env.CLINT
    };

    //Find my user and send that back
    User.findOne({facebook_id: facebookId[username] }, function(err, user) {
    // User.findOne({ facebook_id: '10104208393961668' }, function(err, user) {
      if (err  ) { return done('database error'); }
      if (!user) { return res.status(401).json({error: true, msg: 'user not found'})};
      //If user is already in the database return the user
      if (user && user.fb_last_update) {
        req.user = user;
      }
      next();
    });
  }
};


