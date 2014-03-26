'use strict';
angular.module('neo4ScrumApp').controller('AddTelephoneCtrl',['$scope','$http','$routeParams','createDialog','$rootScope', function($scope,$http,$routeParams,createDialogService,$rootScope) {
    $scope.add = function() {var telephone = {};
                             telephone.city = this.city;
                            telephone.number = this.number;
                             telephone.cap = this.cap;
                             telephone.just_insert = true
                             telephone.use = this.use;
                             $rootScope.customer.LIVES_IN.push({data:telephone,use:{use:telephone.use,id:-1}});
                             //$rootScope..$modalClose();
                            }
}]);