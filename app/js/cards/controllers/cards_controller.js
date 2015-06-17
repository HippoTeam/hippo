'use strict';

module.exports = function(app) {

  app.controller('cardsController', ['$scope', 'RESTResource', 'copy', 'setEmpty', '$location', 'auth', function($scope, resource, copy, empty, $location, auth) {

    var Card = resource('cards');

    $scope.errors = [];
    $scope.cards = [];

    $scope.getAll = function() {
      var currPath = $location.path();

      // If not signed in & token in params, set eat
      if (!auth.isSignedIn() && currPath && getTokenParam(currPath)) {
        auth.setEat(getTokenParam(currPath));
      }

      // If still not signed in, redirect
      if (!auth.isSignedIn()) { $location.path('/login'); }

      // Else show cards
      Card.getAll(function(err, data) {
        if(err) return $scope.errors.push({msg: 'error retrieving cards'});
        $scope.cards = data;
      });
    };

    $scope.createNewCard = function(card) {
      var newCard = copy(card);
      card = empty(card);
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

    $scope.toggleEdit = function(card) {
      if(card.editing) {
        card.personName = card.personNameBackup;
        card.personPic = card.personPicBackup;
        card.personNameBackup = undefined;
        card.personPicBackup = undefined;
        card.editing = false;
      } else {
        card.personNameBackup = card.personName;
        card.personPicBackup = card.personPic;
        card.editing = true;
      }
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

    $scope.isFriend = function($event) {
      if ($event.target.innerText === $scope.cards.answer) {
        if($event.target.nextSibling.style){
          $event.target.style.backgroundColor = 'green';
        } else {
          $event.target.firstElementChild.style.backgroundColor = 'green';
        }
      } else {
        if($event.target.nextSibling.style) {
          $event.target.style.backgroundColor = 'lightcoral';
        } else {
          $event.target.firstElementChild.style.backgroundColor = 'lightcoral';
        }
      }
    };

    $scope.isFriendStyle = function(card) {
      // if(card.button) {
      //   return 'green';
      // } else {
      //   return 'red';
      // }
    };

    function getTokenParam(locStr) {
      console.log("LOCATION STRING TO SPLIT IS: ", locStr);
      var locArr = locStr.split('/');

      // If no param on the end, return false, else return the param
      return (locArr.length < 3 ? false : locArr[locArr.length -1]);
    }

  }]);
};
