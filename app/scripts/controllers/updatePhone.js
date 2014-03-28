"use strict"
angular.module('neo4ScrumApp').controller('UpdatePhoneCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.number = $rootScope.updatingPhone.data.number.toString();
    $scope.use = $rootScope.updatingPhone.use.use;
    $scope.note = $rootScope.updatingPhone.data.note;
    $scope.error = "inserisci un numero di telefono valido";
    $scope.numberEdited = function(){
        document.getElementById('fundooSuccessButton').disabled = ! this.newTelephone.$valid;
        if (this.newTelephone.$valid){
            $scope.error = '';
        }
        else{
            $scope.error = "inserisci un numero di telefono valido";
        }
    };
}]);