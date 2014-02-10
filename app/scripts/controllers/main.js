'use strict';

angular.module('neo4ScrumApp')
  .controller('MainCtrl', function ($scope, $http) {
      http.get('/api/awesomeThings').success(function(aw){$scope.awesomeThings = aw;})
  });
