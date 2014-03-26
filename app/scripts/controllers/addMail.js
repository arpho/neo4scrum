'use strict';
angular.module('neo4ScrumApp').controller('AddMailCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.add = function() {var mail = {};
                             mail.mail = this.mail;
                             mail.just_insert = true;
                            mail.note = this.note;
                             mail.use = this.use;
                             $rootScope.customer.LIVES_IN.push({data:mail,use:{use:mail.use,id:-1}});
                             //$rootScope..$modalClose();
                            }
}]);