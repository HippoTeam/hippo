'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('cards controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('hippoApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function() {
    var cardsController = $ControllerConstructor('cardsController', {$scope: $scope});
    expect(typeof cardsController).toBe('object');
    expect(Array.isArray($scope.cards)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.cardsController = $ControllerConstructor('cardsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/api/cards').respond(200, [{_id: '1', personName: 'test card'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.cards[0].personName).toBe('test card');
      expect($scope.cards[0]._id).toBe('1');
    });

    it('should correctly handle errors', function() {
      $httpBackend.expectGET('/api/cards').respond(500, {msg: 'server error'}) ;
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('error retrieving cards');
    });

    it('should be able to save a new card', function() {
      $scope.newCard = {personName: 'test card'};
      $httpBackend.expectPOST('/api/cards').respond(200, {_id: '2', personName: 'test card'});
      $scope.createNewCard();
      $httpBackend.flush();
      expect($scope.cards[0].personName).toBe('test card');
      expect($scope.cards[0]._id).toBe('2');
      expect($scope.newCard).toBe(null);
    });

    it('should delete a card', function() {
      var card = {_id: '3', personName: 'test card'};
      $scope.cards.push(card);
      $httpBackend.expectDELETE('/api/cards/3').respond(200, {msg: 'success!'});

      expect($scope.cards.indexOf(card)).not.toBe(-1);
      $scope.removeCard(card);
      expect($scope.cards.indexOf(card)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

    it('should delete a card even on server error', function() {
      var card = {_id: '4', personName: 'test card'};
      $scope.cards.push(card);
      $httpBackend.expectDELETE('/api/cards/4').respond(500, {msg: 'deleted'});

      expect($scope.cards.indexOf(card)).not.toBe(-1);
      $scope.removeCard(card);
      expect($scope.cards.indexOf(card)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('could not remove card: test card')
    });

  });
});
