'use strict';
angular.module('neo4ScrumApp').controller('UpdateMailCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.use = $rootScope.updatingMail.data.use;
    $scope.note = $rootScope.updatingMail.data.note;
    $scope.mail = $rootScope.updatingMail.data.mail;
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