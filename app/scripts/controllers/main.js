'use strict';

angular.module('neo4ScrumApp')
  .controller('MainCtrl', function ($scope, $http) {
      $scope.pageTitle = 'Projects View'
      //http.get('/api/awesomeThings').success(function(aw){$scope.awesomeThings = aw;})
  });
