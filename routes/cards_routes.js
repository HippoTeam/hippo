'use strict';

var Card        = require('../models/Card'            );
var bodyparser  = require('body-parser'               );
var eatAuth     = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var randomArray = require('../lib/randomArrayElements');


module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/cards', eatAuth, function(req, res) {
    Card.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      var array = randomArray(data, 4)
      var returnObj = {};
      returnObj.pic_url = array[0].personPic;
      returnObj.answer = array[0].personName;
      returnObj._id = array[0]._id;
      var namesArray = array.map(function(obj) {
        return obj.personName;});
      returnObj.names = randomArray(namesArray, 4);
      res.json(returnObj);
    });
  });

  router.post('/cards', eatAuth, function(req, res) {
    var newCard = new Card(req.body);
    newCard.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.put('/cards/:id', eatAuth, function(req, res) {
    var updatedCard = req.body;
    delete updatedCard._id;

    Card.update({'_id': req.params.id}, updatedCard, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'success'});
    });
  });

  router.delete('/cards/:id', eatAuth, function(req, res) {
    Card.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'success'});
    });
  });
};
