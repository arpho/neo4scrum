'use strict';
angular.module('neo4ScrumApp').controller('CustomerCtrl',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
    var customerId = $routeParams.customerId; // rimuovo :
    if (typeof customerId != 'undefined') {
        console.log("cerco customer "+customerId);
        $http.get('/api/customer/:'+customerId).success(function(customer) {
            $scope.customer = customer.data[0].data;
            $scope.customer.LIVES_IN = [];
            $scope.customer.ANSWERS_TO = [];
            $scope.customer.RECEIVES = [];
            $scope.customer.id = customer.data[0].id;
            $scope.action = 'update';
             /* i dati in arrivo dal server sono organizzabili in triplette [customer,relazione,item]
             customer è sempre lo stesso di data[0].data definisco una funzione che interpreta i valori di relazione
             e quiundi il significato di item e lo aggiunge allo array relativo di customer*/
            var add2customer = function(triplet) {
                console.log(triplet[1].type);
                $scope.customer[triplet[1].type].push({data:triplet[2].data,use:triplet[1].data});
            }
            var details = customer.data.length/3; // ottengo il numero dettagli afferenti al cliente
            //aggiungo i dettagli a $scope.customer
            for (var i=0;i<details;i++) {
                add2customer([customer.data[i*3],customer.data[i*3+1],customer.data[i*3+2]]);
            }
            
        })
    }
    else {
            $scope.action = 'save';
            $scope.customer.LIVES_IN = [];
            $scope.customer.ANSWERS_TO = [];
            $scope.customer.RECEIVES = [];
    }
}])