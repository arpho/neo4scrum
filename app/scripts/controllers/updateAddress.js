'use strict';
angular.module('neo4ScrumApp').controller('UpdateAddressCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.city = $rootScope.updatingAddress.data.city;
    $scope.number = $rootScope.updatingAddress.data.number;
    $scope.cap = $rootScope.updatingAddress.data.cap;
    $scope.use = $rootScope.updatingAddress.data.use;
    $scope.street = $rootScope.updatingAddress.data.street;
    $scope.change = function(){
        document.getElementById('fundooSuccessButton').disabled = false;
    }
    $scope.update = function() {var address = {};
                             address.city = this.city;
                             address.number = this.number;
                             address.cap = this.cap;
                             address.just_insert = true
                             address.use = this.use;
                             //$rootScope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                             //$rootScope..$modalClose();
                            }
}]);