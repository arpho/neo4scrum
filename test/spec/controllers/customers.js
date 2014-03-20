'use strict';

describe('Controller: CustomersListCtrl', function () {

  // load the controller's module
  beforeEach(module('neo4ScrumApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/customersList')
      .respond([{data:{ name: 'Giuseppe', surname: 'D\'Amico', note: 'it\'s me' },id: '25618'}]);    
    scope = $rootScope.$new();
    MainCtrl = $controller('CustomersListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of customers with one only item', function () {
    expect(scope.awesomeThings).toBeUndefined();
    $httpBackend.flush();
    //  console.log(scope.customers);
    expect(scope.customers.length).toBe(1);
  });
});