'use strict';

var bodyparser  = require('body-parser'               );
var Card        = require('../models/Card'            );
var eatAuth     = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var calcMemRate = require('../lib/calc_mem_rate.js'   );
var randomArray = require('../lib/randomArrayElements');

function handleError(err, res, userMsg, msg) {
  msg ? console.log(msg, err) : console.log(err);
  res.status(500).json({error: true, msg: userMsg});
}

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/cards', eatAuth, function(req, res) {
    var percent = req.user.settings.mem_rate_filter || 100;

    Card.find({userId: req.user.facebook_id, mem_rate: { $lte: percent }}, function(err, cards) {
      if (err ) { return handleError(err, res, 'internal server error'); }
      if (cards.length === 0) {   // no cards
        return handleError(false, res, 'Good job - no more user scores this low!');
      }
      var card = randomArray(cards, 1);   // take one, keep it random

      Card.find({userId: req.user.facebook_id}, function(error, otherCards) {
        if (error) { return handleError(error, res, 'internal server error'); }

        // remove duplicate names from guesses
        var array = randomArray(otherCards, req.user.settings.num_buttons);
        array.filter(function(elem) { card.personName !==  elem.personName});

        // if now too many after removing duplciate, return error msg
        if (otherCards.length < req.user.settings.num_buttons - 1) {
          return handleError(error, res, 'not enough cards')
        }

        // if too many still, remove one
        if (array.length === (req.user.settings.num_buttons) ) { array.pop(); }

        var returnObj     = {};
        returnObj.pic_url = card[0].personPic;
        returnObj.answer  = card[0].personName;
        returnObj._id     = card[0]._id;

        var namesArray    = array.map(function(obj) { return obj.personName; });
        namesArray.push(card[0].personName);        // add answer into names array
        returnObj.names   = randomArray(namesArray);
        res.json(returnObj);
      });
    });
  });

  router.patch('/cards', eatAuth, function(req, res) {
    var updateInfo = req.body;  //  {_id(card):..., guesses: ...}
    var addGuesses = req.body.guesses;

    Card.findOne({_id: updateInfo._id}, function(err, card) {
      if (err) { return handleError(err, 'internal server err', 'Error finding card. Error: '); }

      // Add guesses, update mem_rate
      addGuesses.forEach(function(elem) { card.guesses.push(elem) });
      card.mem_rate = calcMemRate(card.personName, card.guesses);

      card.save(function (error, updCard) {
        if (error) { return handleError(error, res, 'internal server err', 'Error updating card. Error: '); }

        res.json({error: false, msg: 'card updated'});
      });
    });
  });

  router.post('/cards', eatAuth, function(req, res) {
    var newCard = new Card(req.body);
    newCard.save(function(err, data) {
      if (err) { return handleError(err, res, 'internal server err'); }

      res.json(data);
    });
  });

  router.put('/cards/:id', eatAuth, function(req, res) {
    var updatedCard = req.body;
    delete updatedCard._id;

    Card.update({'_id': req.params.id}, updatedCard, function(err, data) {
      if (err) { return handleError(err, res, 'internal server err'); }

      res.json({msg: 'success'});
    });
  });

  router.delete('/cards/:id', eatAuth, function(req, res) {
    Card.remove({'_id': req.params.id}, function(err, data) {
      if (err) { return handleError(err, res, 'internal server err'); }

      res.json({msg: 'success'});
    });
  });
};
