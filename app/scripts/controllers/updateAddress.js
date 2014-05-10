'use strict';
angular.module('neo4ScrumApp').controller('UpdateAddressCtrl',['$scope','$http','$routeParams','createDialog','$rootScope','updateAddressService', function($scope,$http,$routeParams,createDialogService,$rootScope,updateAddressService) {
    $scope.city = updateAddressService.getItem().data.city;
    $scope.number = updateAddressService.getItem().data.number;
    $scope.cap = updateAddressService.getItem().data.cap;
    $scope.use = updateAddressService.getItem().data.use;
    $scope.street = updateAddressService.getItem().data.street;
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