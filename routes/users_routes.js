'use strict';

var bodyparser = require('body-parser'      );
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');


module.exports = function(router) {
  router.use(bodyparser.json());

  // R
  router.get('/users/:id', eatAuth, function(req, res) {
    // TODO: REFACTOR THIS TO REQUIRE AUTH
    User.findOne({_id: req.params.id}, function(err, user) {
      if (err) {
        console.log('Error finding user by id. Error: ', err);
        res.status(500).json({error: true});
      }

      res.json({user: user}); // Refactor to: res.json(req.user);
    });
  });

  // Update user settings; takes a settings object
  router.patch('/users/settings', eatAuth, function(req, res) {
    var settingsUpdates = req.body;

    User.findByIdAndUpdate(req.user._id,
      { $set: { 'user.settings': settingsUpdates } }, function(err, user) {
        if (err) {
          console.log('Error saving user settings. Error: ', err);
          return res.status(500).json({error: true, msg: 'internal server error'});
        }


      res.json({error: false, user: user});
    });
  });
}
