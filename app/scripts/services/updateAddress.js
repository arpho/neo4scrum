'use strict';
angular.module('neo4ScrumApp').service('updateAddressService',['createDialog', function(createDialogService,$scope) {
    var Address = null,
        indexOfId = function(l,id){
        /* cerca la posizione dell'elemento con id specificato in una lista
        @param []::[{id:object}]: lista in esame
        @param object: id ricercato
        @return int:-1 se non trova, altrimenti la posizione
        */
        for (var i=0;i<l.length;i++){
            if (l[i].id==id){
                return i;
            }
        }
        return -1;
    };
    var addressUpdater = function(address,customer){
            var index = indexOfId(customer.LIVES_IN,address.id);
            customer.LIVES_IN[index] = address;
        }
    
    return {
        setItem: function(v){
            Address = v;
        },
        getItem: function(){
            return Address;
        },
        updaterDialog:function(customer){
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
                                address.id = Address.id;
                                // scope.customer.LIVES_IN.push({data:address,use:{use:address.use,id:-1}});
                            //cerco la posizione dell'oggetto nella lista
                            //sostituisco l'indirizzo aggiornato
                            addressUpdater(address,customer);
                        }
                                 },
                        cancel: {label: 'Cancel', fn: function() {}}
                 });
        }
    }
}]);