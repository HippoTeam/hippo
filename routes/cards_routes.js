'use strict';

var Card        = require('../models/Card'            );
var bodyparser  = require('body-parser'               );
var eatAuth     = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var randomArray = require('../lib/randomArrayElements');

function handleError(err, res, userMsg, msg) {
  msg ? console.log(msg, err) : console.log(err);
  res.status(500).json({error: true, msg: userMsg});
}

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/cards', eatAuth, function(req, res) {
    Card.find({}, function(err, data) {
      if (err) { handleError(err, res, 'internal server err'); }

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

  router.patch('/cards', eatAuth, function(req, res) {
    var updateInfo = req.body;  //  {_id(card):..., guesses: ...}
    console.log(updateInfo.guesses);

    Card.findOne({_id: updateInfo._id}, function(err, card) {
      if (err) { handleError(err, res, 'internal server err', 'Error finding card. Error: '); }
      console.log("FOUND THIS CARD FROM ID: ", card);
      console.log("GUESSES BEFORE UPDATE ARE: ", card.guesses);

      var combinedGuesses = card.guesses.push(updateInfo.guesses);
      Card.update({_id: card._id}, combinedGuesses, function(error, updCard) {
        console.log("GUESSES AFTER UPDATE ARE: ", updCard.guesses);
        if (error) { handleError(error, res, 'internal server err', 'Error updating card. Error: '); }

        res.json({error: false, msg: 'card updated'});
      });
    });

  });

  router.post('/cards', eatAuth, function(req, res) {
    var newCard = new Card(req.body);
    newCard.save(function(err, data) {
      if (err) { handleError(err, res, 'internal server err'); }

      res.json(data);
    });
  });

  router.put('/cards/:id', eatAuth, function(req, res) {
    var updatedCard = req.body;
    delete updatedCard._id;

    Card.update({'_id': req.params.id}, updatedCard, function(err, data) {
      if (err) { handleError(err, res, 'internal server err'); }

      res.json({msg: 'success'});
    });
  });

  router.delete('/cards/:id', eatAuth, function(req, res) {
    Card.remove({'_id': req.params.id}, function(err, data) {
      if (err) { handleError(err, res, 'internal server err'); }

      res.json({msg: 'success'});
    });
  });
};
