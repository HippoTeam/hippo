'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var envVar   = require('./test_env_vars.js');
var expect = chai.expect;
var Card = require('../models/Card.js');
var createUserAndEat = require('./support/create_test_user.js');

// Env Variables
process.env.AUTH_SECRET         = envVar.AUTH_SECRET;
process.env.FACEBOOK_APP_ID     = envVar.FACEBOOK_APP_ID;
process.env.FACEBOOK_APP_SECRET = envVar.FACEBOOK_APP_SECRET;

// Set test db
process.env.MONGOLAB_URI = 'mongodb://localhost/hippo_test';

// Start server
require('../server');


describe('cards REST api', function() {
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
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new card', function(done) {
    chai.request('localhost:3000')
      .post('/cards')
      .set({eat: testToken})
      .send({personPic: 'url', personName:'testname'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.personPic).to.eql('url');
        expect(res.body.personName).to.eql('testname');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('needs at least 4 existing cards to work with' , function() {
    beforeEach(function(done) {
      var count = 0;
      var testCard1 = new Card({personPic: 'pic1', personName:'name1'});
      var testCard2 = new Card({personPic: 'pic2', personName:'name2'});
      var testCard3 = new Card({personPic: 'pic3', personName:'name3'});
      var testCard4 = new Card({personPic: 'pic4', personName:'name4'});
      testCard1.save(callbackFun);
      testCard2.save(callbackFun);
      testCard3.save(callbackFun);
      testCard4.save(callbackFun);
      function callbackFun(err, data) {
        if(err) throw err;
        allSaved();
      }
      function allSaved() {
        count++;
        if (count === 4) {
          done();
        }
      }
    });

    it('should get an object on a get request', function(done) {
      chai.request('localhost:3000')
      .get('/cards')
      .set({eat: testToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('pic_url');
        expect(res.body).to.have.property('answer');
        expect(res.body.names.length).to.eql(4);
        done();
      });
    });
  });

  describe('needs an existing card to work with', function() {
    var testUser;
    var testToken;

    before(function(done) {
      createUserAndEat(function(user, token) {
        testUser  = user;
        testToken = token;
      });

      var testCard = new Card({personPic: 'pic', personName:'name'});
      testCard.save(function(err, data) {
        if(err) throw err;

        this.testCard = data;
        done();
      }.bind(this));
    });

    it('should be able to make a card in a beforeEach block', function() {
      expect(this.testCard.personPic).to.eql('pic');
      expect(this.testCard.personName).to.eql('name');
      expect(this.testCard).to.have.property('_id');
    });

    it('should update a card', function(done) {
      var id = this.testCard._id;
      chai.request('localhost:3000')
      .put('/cards/' + id)
      .set({eat: testToken})
      .send({personPic: 'updated url', personName:'updated testname'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should be able to delete a card', function(done) {
      chai.request('localhost:3000')
        .del('/cards/' + this.testCard._id)
        .set({eat: testToken})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
