'use strict';

angular.module('neo4ScrumApp').
directive('scrumUpdateMail',['createDialog','updateMailService','updateMailService',function(createDialogService,rootScope,updateMailService){
    return {
        template: '<img ng-src="img/pencil.png"  ng-click="updatePropertyPencil()"',
    restrict: 'E',
        replace:true,
        scope: {
        item: '=',
        swapper:'=', // è il servizio che serve le funzioni da usare nella direttiva
            updater:'=', // aggiorna il parametro nella lista corrispondente
            customer:'='
      },
        link:function(scope, element, attrs,createDialog){
            console.log("updateMail directive");
            scope.updatePropertyPencil = function(){
                scope.swapper.setItem(scope.item);
                scope.item.updated = true;
                //cope.updatingAddress = scope.item;
                scope.swapper.updaterDialog(scope.customer);
            }
        }
        }
    }]);