/**
 * @author arpho
 */
'use strict';
angular.module('neo4ScrumApp').factory('customerRepository', function($http, $q) {
    return {
    	getCustomer: function(customerId){
    		var url = '/api/customer/:'+customerId;
    		return $http.get(url);
    	},
    	populateCustomer:function(data){
    		var customer = {};
            customer = data.data[0].data;
    		customer.LIVES_IN = [];
		    customer.ANSWERS_TO = [];
		    customer.RECEIVES = [];
		    customer.data = data;
            /* i dati in arrivo dal server sono organizzabili in triplette [customer,relazione,item]
             customer è sempre lo stesso di data[0].data definisco una funzione che interpreta i valori di relazione
             e quiundi il significato di item e lo aggiunge allo array relativo di customer*/
            var add2customer = function(triplet) {
                customer[triplet[1].type].push({data:triplet[2].data,use:triplet[1].data,id:triplet[2].id});
            };
            var details = customer.data.data.length/3; // ottengo il numero dettagli afferenti al cliente
            //aggiungo i dettagli a $scope.customer
            for (var i=0;i<details;i++) {
                add2customer([customer.data.data[i*3],customer.data.data[i*3+1],customer.data.data[i*3+2]]);
            }
            return customer;
    	} };
 });