'use strict';

var _                = require('lodash'            );
var chai             = require('chai'              );
var chaihttp         = require('chai-http'         );
var createUserAndEat = require('./support/create_test_user.js');
var envVar           = require('./test_env_vars.js');
var expect           = chai.expect;
var mongoose         = require('mongoose'          );
var User             = require('../models/User.js' );
chai.use(chaihttp);

// Set Test Env Variables
process.env.AUTH_SECRET         = envVar.AUTH_SECRET;
process.env.FACEBOOK_APP_ID     = envVar.FACEBOOK_APP_ID;
process.env.FACEBOOK_APP_SECRET = envVar.FACEBOOK_APP_SECRET;
process.env.MONGOLAB_URI        = 'mongodb://localhost/hippo_test';


//Start Server
require('../server.js');

describe('User_Routes', function() {
  describe('with valid authentication', function() {
    // var newUser;
    var testUser;
    var testToken;

    before(function(done) {
      createUserAndEat(function(user, token) {
        testUser  = user;
        testToken = token;
        done();
      });
    });
    after(function(done) {
      mongoose.connection.db.dropDatabase(function() { done(); });
    });

    describe('GET to /user/:id', function() {

      it('returns the user matching the id', function(done) {
        chai.request('localhost:3000')
          .get('/users/' + testUser._id)
          .set({eat: testToken})
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.body.user.facebook_id).to.eq('1234');
            done();
          });
      });
    });

    describe('PATCH /users/settings', function() {
      it('updates the users settings for the passed updates', function(done) {
        // var userCopy = _.cloneDeep(testUser);
        console.log("THE TEST TOKEN IS: ", testToken);
        console.log("THE TEST USER IS: ", testUser);
        // expect(testUser.settings.mem_rate_filter).to.eq(100);
        chai.request('localhost:3000')
          .patch('/users/settings')
          .set({eat: testToken})
          .send({ mem_rate_filter: 50 })
          .end(function(err, res) {
            var user = res.body.user;
            expect(err).to.eq(null);
            console.log("RETURNED UPDATED USER IS: ", user);
            expect(user.settings.mem_rate_filter).to.eq(50);
            done();
        });
      });
    });
  });
});
