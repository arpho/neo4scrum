'use strict';
angular.module('neo4ScrumApp').controller('CustomerListCtrl',function($scope,$http) {
    console.log('CustomerslistCtrl');
    $http.get('/api/customersList').success(function(customers) {
        $scope.customers = customers;
    })
})