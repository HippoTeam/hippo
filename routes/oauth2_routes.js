'use strict';

// var bodyparser = require('body-parser');

module.exports = function(app, passport) {
//  app.use(bodyparser.json());

  // Facebook
  app.get('/auth/facebook', passport.authenticate('facebook', { session: false, scope: ['user_friends']}));

  // Redirect
  app.get('/auth/facebook/callback',
          passport.authenticate('facebook', { session:         false,
                                              successRedirect: '/',
                                              failureRedirect: '/#/login' }));
}


