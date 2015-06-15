'use strict';

module.exports = function(app) {
  app.controller('cardsController', ['$scope', 'RESTResource', function($scope, resource) {
    var Card = resource('cards');

    $scope.errors = [];
    $scope.cards = [];

    $scope.getAll = function() {
      Card.getAll(function(err, data) {
        if(err) return $scope.errors.push({msg: 'error retrieving cards'});
        $scope.cards = data;
      });
    };

    $scope.createNewCard = function() {
      var newCard = $scope.newCard;
      $scope.newCard = null;
      $scope.cards.push(newCard);
      Card.create(newCard, function(err, data) {
        if(err) return $scope.errors.push({msg: 'could not save new card' + newCard.personName});
        $scope.cards.splice($scope.cards.indexOf(newCard), 1, data);
      });
    };

    $scope.removeCard = function(card) {
      $scope.cards.splice($scope.cards.indexOf(card), 1);
      Card.remove(card, function(err) {
        if(err) {
          $scope.errors.push({msg: 'could not remove card: ' + card.personName});
        }
      });
    };

    $scope.saveCard = function(card) {
      card.editing = false;
      Card.save(card, function(err, data) {
        if(err) $scope.errors.push({msg: 'could not update card'});
      });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

    $scope.isFriend = function(card) {
      // card.button = true;
    };

    $scope.isFriendStyle = function(card) {
      // if(card.button) {
      //   return 'green';
      // } else {
      //   return 'red';
      // }
    };

  }]);
};
