'use strict';

var bodyparser = require('body-parser'      );
var User       = require('../models/User.js');


module.exports = function(router) {
  router.use(bodyparser.json());

  // R
  router.get('/users/:id', function(req, res) {
    // TODO: refactor this to auth module
    User.findOne({_id: req.params.id}, function(err, user) {
      if (err) {
        console.log('Error finding user by id. Error: ', err);
        res.status(500).json({error: true});
      }

      res.json({user: user}); // Refactor to: res.json(req.user);
    });
  });
}
