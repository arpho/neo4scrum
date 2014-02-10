'use strict';
angular.module('neo4ScrumApp').controller('CustomerCtrl',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
    var customerId = $routeParams.customerId; // rimuovo :
    if (typeof customerId != 'undefined') {
        console.log("cerco customer "+customerId);
        $http.get('/api/customer/:'+customerId).success(function(customer) {
            $scope.customer = customer.data[0].data;
            $scope.customer.id = customer.id;
            $scope.action = 'update';
        })
    }
    else 
        $scope.action = 'save';
}])