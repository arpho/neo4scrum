'use strict';
angular.module('neo4ScrumApp').controller('AddMailCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.add = function() {var mail = {};
                             mail.data.mail = this.mail;
                             mail.just_insert = true;
                            mail.data.note = this.note;
                             mail.use.use = this.use;
                             $rootScope.customer.LIVES_IN.push({data:mail,use:{use:mail.use,id:-1}});
                             //$rootScope..$modalClose();
                            }
    $scope.error ='inserisci una mail valida';
    $scope.mailEdited = function(){
        document.getElementById('fundooSuccessButton').disabled = ! this.newMail.$valid;
        if (this.newMail.$valid){
            $scope.error = '';
        }
    }
}]);