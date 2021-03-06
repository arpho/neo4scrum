'use strict';

angular.module('neo4ScrumApp').
directive('scrumUpdateAddress',['createDialog','updateAddressService',function(createDialogService,rootScope,updateAddressService){
    return {
        template: '<img ng-src="img/pencil.png"  ng-click="updateAddressPencil()"',
    restrict: 'E',
        replace:true,
        scope: {
        item: '=',
        swapper:'=', // è il servizio che serve le funzioni da usare nella direttiva
            updater:'=', // aggiorna il parametro nella lista corrispondente
            customer:'='
      },
        link:function(scope, element, attrs,createDialog){
            scope.updateAddressPencil = function(){
                scope.swapper.setItem(scope.item);
                scope.item.updated = true;
                //cope.updatingAddress = scope.item;
                scope.swapper.updaterDialog(scope.customer);
            }
        }
        }
    }]);