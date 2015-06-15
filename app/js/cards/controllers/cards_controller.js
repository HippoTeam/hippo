'use strict';

module.exports = function(app) {
  app.controller('cardsController', ['$scope', '$http', function($scope, $http) {
    $scope.errors = [];
    $scope.cards = [];

    $scope.getAll = function() {
      $http.get('/api/cards')
        .success(function(data) {
          $scope.cards = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error retrieving cards'});
        });
    };

    $scope.createNewCard = function() {
      $http.post('/api/cards', $scope.newCard)
        .success(function(data) {
          $scope.cards.push(data);
          $scope.newCard = null;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not create new card'});
        });
    };

    $scope.removeCard = function(card) {
      $scope.cards.splice($scope.cards.indexOf(card), 1);
      $http.delete('/api/cards/' + card._id)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not remove card: ' + card.personName});
        });
    };

    $scope.saveCard = function(card) {
      card.editing = false;
      $http.put('/api/cards/' + card._id, card)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not update card'});
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
