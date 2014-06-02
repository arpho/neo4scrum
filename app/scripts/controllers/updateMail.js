'use strict';
angular.module('neo4ScrumApp').controller('UpdateMailCtrl',['$scope','$http','$routeParams','createDialog','$rootScope','updateMailService', function($scope,$http,$routeParams,createDialogService,$rootScope,updateMailService) {
    //$scope.city = updateAddressService.getItem().data.city;
    $scope.use = updateMailService.getItem().data.use;
    $scope.note = updateMailService.getItem().data.note;
    $scope.mail = updateMailService.getItem().data.mail;
    $scope.change = function(){
        document.getElementById('fundooSuccessButton').disabled = false;
    };
    $scope.mailEdited = function(){
        document.getElementById('fundooSuccessButton').disabled = ! this.newMail.$valid;
        if (this.newMail.$valid){
            $scope.error = '';
        }
        else{
            $scope.error = "inserisci un numero di telefono valido";
        }
    };
}]);