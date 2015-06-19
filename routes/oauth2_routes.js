'use strict';

var bodyparser = require('body-parser');

module.exports = function(app, passport) {
  app.use(bodyparser.json());

  // Facebook
  app.get('/auth/facebook',
    passport.authenticate('facebook',
      { session: false,
        scope: ['user_friends']
      }
    ));

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

      res.redirect('/#/auth?token=' + token);
    });
  }
};


