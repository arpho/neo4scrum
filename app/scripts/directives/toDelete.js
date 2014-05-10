'use strict';

angular.module('neo4ScrumApp').
directive('toDelete', function(){
    return {
        template: '<img ng-src="img/delete.png" class="testdirectives" ng-click="delete()"',
    restrict: 'E',
        replace:true,
        scope: {
        item: '='
      },
        link: function(scope, element, attrs){
            
            scope.delete = function(){
                console.log('deleting');
                console.log(scope.item);
                scope.item.toDelete = true;
            }
        }
    }
    });