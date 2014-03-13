'use strict';
angular.module('neo4ScrumApp').controller('AddAddressCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.add = function() {var address = {};
                             address.city = this.city;
                             address.number = this.number;
                             address.cap = this.cap;
                             address.use = this.use;
                             $rootScope.customer.address.added.push(address);
                             console.log($rootScope.customer);
                            }
}]);