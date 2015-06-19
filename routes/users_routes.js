'use strict';

var bodyparser = require('body-parser'      );
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');


module.exports = function(router) {
  router.use(bodyparser.json());

  // User Get request (Using eatAuth)
  router.get('/users', eatAuth, function(req, res) {
    res.json(req.user);
  });

  // Update user settings; takes a settings object
  router.patch('/users', eatAuth, function(req, res) {
    var settingsUpdates = req.body;

    User.update({_id: req.user._id},
      { $set: { settings: settingsUpdates } }, function(err, update) {
        if (err) {
          console.log('Error saving user settings. Error: ', err);
          return res.status(500).json({error: true, msg: 'internal server error'});
        }

        // Check if update failed
        if (!update.ok) {
          console.log('Update was NOT successful');
          return res.status(422).json({error: true, msg: 'udpates could not be saved'});
        }

        res.json({error: false, success: true, msg: 'updates saved'});
    });
  });
}
