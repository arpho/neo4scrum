'use strict';
angular.module('neo4ScrumApp').controller('CustomersListCtrl',function($scope,$http) {
    $http.get('/api/customersList').success(function(customers) {
        $scope.customers = customers;
    })
})