'use strict';
angular.module('neo4ScrumApp').controller('AddAddressCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.add = function() {var address = {};
                             address.city = this.city;
                             address.number = this.number;
                             address.cap = this.cap;
                             address.just_insert = true
                             address.use = this.use;
                             $rootScope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                             //$rootScope..$modalClose();
                            }
}]);