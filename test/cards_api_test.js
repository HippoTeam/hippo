'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var envVar   = require('./test_env_vars.js');
var expect = chai.expect;
var Card = require('../models/Card');

// Env Variables
process.env.FACEBOOK_APP_ID     = envVar.FACEBOOK_APP_ID;
process.env.FACEBOOK_APP_SECRET = envVar.FACEBOOK_APP_SECRET;

// Set test db
process.env.MONGOLAB_URI = 'mongodb://localhost/hippo_test';

// Start server
require('../server');

describe('cards REST api', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new card', function(done) {
    chai.request('localhost:3000')
      .post('/cards')
      .send({personPic: 'url', personName:'testname'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.personPic).to.eql('url');
        expect(res.body.personName).to.eql('testname');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get an array of cards', function(done) {
    chai.request('localhost:3000')
    .get('/cards')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(4);
      done();
    });
  });

  describe('needs an existing card to work with', function() {
    beforeEach(function(done) {
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
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
