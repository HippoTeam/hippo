'use strict';

var chai     = require('chai'              );
var chaihttp = require('chai-http'         );
var envVar   = require('./test_env_vars.js');
var expect   = chai.expect;
var mongoose = require('mongoose'          );
var User     = require('../models/User.js' );
chai.use(chaihttp);

// Set Test Env Variables
process.env.MONGOLAB_URI        = 'mongodb://localhost/hippo_test';



//Start Server
require('../server.js');

describe('User_Routes', function() {
  describe('with valid authentication', function() {
    describe('GET to /user/:id', function() {
      var newUser;
      before(function(done) {
        User.create({facebook_id: '1234abcd'}, function(err, user) {
          expect(err).to.eq(null);
          newUser = user;
          done();
        });
      });
      after(function() {
        mongoose.connection.db.dropDatabase(function(done) { done(); });
      });

      it('returns the user matching the id', function(done) {
        chai.request('localhost:3000')
          .get('/users/' + newUser._id)
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.body.user.facebook_id).to.eq('1234abcd');
            done();
          });
      });
    });
  });
});
