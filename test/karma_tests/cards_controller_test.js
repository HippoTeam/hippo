'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('cards controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $location;
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
    expect(Array.isArray($scope.guesses)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
    expect(typeof $scope.isFriend).toBe('function');
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.cardsController = $ControllerConstructor('cardsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/cards').respond(200, [{_id: '1', personName: 'test card'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.cards[0].personName).toBe('test card');
      expect($scope.cards[0]._id).toBe('1');
    });

    it('should correctly handle errors', function() {
      $httpBackend.expectGET('/cards').respond(500, {msg: 'server error'}) ;
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('error retrieving cards');
    });

    it('should be able to save a new card', function() {
      var newCard = {personName: 'test card'};
      $httpBackend.expectPOST('/cards').respond(200, {_id: '2', personName: 'test card'});
      $scope.createNewCard(newCard);
      $httpBackend.flush();
      expect($scope.cards[0].personName).toBe('test card');
      expect($scope.cards[0]._id).toBe('2');
      expect($scope.errors.length).toBe(0);
    });

    it('should delete a card', function() {
      var card = {_id: '3', personName: 'test card'};
      $scope.cards.push(card);
      $httpBackend.expectDELETE('/cards/3').respond(200, {msg: 'success!'});

      expect($scope.cards.indexOf(card)).not.toBe(-1);
      $scope.removeCard(card);
      expect($scope.cards.indexOf(card)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

    it('should delete a card even on server error', function() {
      var card = {_id: '4', personName: 'test card'};
      $scope.cards.push(card);
      $httpBackend.expectDELETE('/cards/4').respond(500, {msg: 'deleted'});

      expect($scope.cards.indexOf(card)).not.toBe(-1);
      $scope.removeCard(card);
      expect($scope.cards.indexOf(card)).toBe(-1);
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('could not remove card: test card');
    });

  });

  describe('controller functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, _$location_) {
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      this.cardsController = $ControllerConstructor('cardsController', {$scope: $scope});
    }));

    it('it should redirect to cards', function() {
      $location.path('/test');
      $scope.redirectCards();
      expect($location.path()).toBe('/cards');
    });

    it('it should redirect to cards2', function() {
      $location.path('/test2');
      $scope.redirectCards2();
      expect($location.path()).toBe('/cards2');
    });

    it('should toggle edit', function() {
      var card = {
        personPic:  'picurl',
        personName: 'Tester',
        userId:     '001',
        guesses:    [],
        mem_rate:   0
      };
      $scope.toggleEdit(card);
      expect(card.editing).toBe(true);
      expect(card.personNameBackup).toBe('Tester');
      expect(card.personPicBackup).toBe('picurl');
      card.personName = 'Name Change';
      card.personPic = 'avatarurl';
      $scope.toggleEdit(card);
      expect(card.editing).toBe(false);
      expect(card.personNameBackup).toBe(undefined);
      expect(card.personPicBackup).toBe(undefined);
      expect(card.personName).toBe('Tester');
      expect(card.personPic).toBe('picurl');
    });
  });
});
