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
process.env.MONGOLAB_URI        = 'mongodb://localhost/hippo_test';


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

  it('POST /cards should be able to create a new card', function(done) {
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

  describe('methods needing at least 4 cards to work with:' , function() {
    before(function(done) {
      var count    = 0;   // verify how many saved thus far
      var allCards = [];  // store created cards here
      var numCards = 5;   // number of cards to create

      // Create and save test cards.
      for(var testCard, i = 1; i <= numCards; i++) {
        (function(num) {
          allCards[num] = new Card({
            personPic:  'pic' + num,
            personName: 'name' + num,
            mem_rate:   10 * i,                // recommend max 10 users
            userId:     testUser.facebook_id   // takes from user var above
          });

          allCards[num].save(callbackFun);
        })(i);
      }

      function callbackFun(err, data) {
        if(err) throw err;
        allSaved();
      }
      function allSaved() {
        count++;
        if (count === numCards) {
          done();
        }
      }
    });

    it('GET /cards should get an object on a get request', function(done) {
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

    it('GET /cards with user mem_rate_filter=40 gets cards with 40% max mem_rate', function(done) {
      testUser.settings.mem_rate_filter = 40;
      testUser.save();

      chai.request('localhost:3000')
      .get('/cards')
      .set({eat: testToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.names.length).to.eq(4);
        expect(res.body.names).to.include('name1');
        expect(res.body.names).to.include('name2');
        expect(res.body.names).to.include('name3');
        expect(res.body.names).to.include('name4');
        done();
      });
    });
  });

  describe('methods needing 1 existing card to work with:', function() {
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

    it('PUT /cards/someId should update the card', function(done) {
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

    it('DELETE /cards/someId should be able to delete the card', function(done) {
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
