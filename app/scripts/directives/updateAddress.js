'use strict';

angular.module('neo4ScrumApp').
directive('scrumUpdateAddress',['createDialog','updateAddressService',function(createDialogService,rootScope,updateAddressService){
    return {
        template: '<img ng-src="img/pencil.png"  ng-click="updateAddressPencil()"',
    restrict: 'E',
        replace:true,
        scope: {
        item: '=',
        swapper:'=',
            updater:'='
      },
        link:function(scope, element, attrs,createDialog){
            console.log("link up");
            scope.updateAddressPencil = function(){
                scope.swapper.setItem(scope.item);
                scope.item.updated = true;
                //cope.updatingAddress = scope.item;
                console.log('dialog todo');
                createDialogService('templates/updateAddress.html',{
                        title: 'Update an address',
                        id:'updateAddressDialog',
                        backdrop:true,
                        controller:'UpdateAddressCtrl',
                        success: {label: 'UpdateAddress', fn: function() {
                                 var address = {};
                                 address.data = {}
                                 address.use = {};
                                 address.updated = true;
                                 address.data.street = document.getElementById('newStreet').form[0].value;
                                 address.data.city = document.getElementById('newStreet').form[1].value;
                                 address.data.cap = document.getElementById('newStreet').form[2].value;
                                 address.data.number = document.getElementById('newStreet').form[3].value;
                                 address.use.use = document.getElementById('newStreet').form[4].value;
                                address.id = scope.swapper.getItem().id;
                                // scope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                            //cerco la posizione dell'oggetto nella lista
                            //sostituisco l'indirizzo aggiornato
                            scope.updater(address);


                                                                   }
                                 },
                        cancel: {label: 'Cancel', fn: function() {}}
                 });
            }
        }
        }
    }]);