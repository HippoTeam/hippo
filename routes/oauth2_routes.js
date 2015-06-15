'use strict';

// var bodyparser = require('body-parser');

module.exports = function(app, passport) {
//  app.use(bodyparser.json());

  // Facebook
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends']}));

  // Redirect
  app.get('/auth/facebook/verification',
          passport.authenticate('facebook', { successRedirect: '/',
                                              failureRedirect: '/login' }));

}


