'use strict';
angular.module('neo4ScrumApp').service('updateAddressService',['createDialog', function(createDialogService) {
    var address = null;
    return {
        setItem: function(v){
            address = v;
        },
        getItem: function(){
            return address;
        },
        updaterDialog:function(updater,swapper){
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
                                address.id = swapper.getItem().id;
                                // scope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                            //cerco la posizione dell'oggetto nella lista
                            //sostituisco l'indirizzo aggiornato
                            updater(address);


                                                                   }
                                 },
                        cancel: {label: 'Cancel', fn: function() {}}
                 });
        }
    }
}]);