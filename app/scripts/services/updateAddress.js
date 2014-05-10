'use strict';
angular.module('neo4ScrumApp').service('updateAddressService', function() {
    var address = null;
    return {
        setItem: function(v){
            address = v;
            console.log('setting item')
        },
        getItem: function(){
            return address;
        }
    }
});