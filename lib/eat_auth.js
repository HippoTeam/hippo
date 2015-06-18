'use strict';

var eat  = require('eat'              );
var User = require('../models/User.js');


module.exports = function(secret) {

  return function eatAuth(req, res, next) {
    var eatoken = req.headers.eat || req.body.eat || req.params.eat;
    eatoken = decodeURIComponent(eatoken);

    if (!eatoken) {
      console.log('no token found');
      return res.status(401).json({error: true, msg: 'please sign in to do that'});
    }

    eat.decode(eatoken, secret, function(err, decoded) {
      if (err) {
        console.log('Could not decode token. Error: ', err);
        return res.status(401).json({error: true, msg: 'please sign in to do that', reset: true});
      }

      User.findOne({eat: decoded}, function(err, user) {
        if(err || !user || (Object.keys(user).length === 0)) {
          console.log('Could not find user from token. Error: ', err);
          return res.status(401).json({error: true, msg: 'please sign in to do that', reset: true});
        }

        req.user = user;  // load req with user
        next();
      });
    });
  };
};
