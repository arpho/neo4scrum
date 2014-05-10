'use strict';
angular.module('neo4ScrumApp').controller('CustomerUpdateCtrl', function($scope,$routeParams,customerRepository,updateAddressService) {
    var customerId = $routeParams.customerId;
        $scope.swapAddress = updateAddressService;
    $scope.indexOfId = function(l,id){
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
    customerRepository.getCustomer(customerId).success(function(customer){$scope.customer = customerRepository.populateCustomer(customer);
        $scope.addressUpdater = function(address){
            var index = $scope.indexOfId($scope.customer.LIVES_IN,address.id);
            $scope.customer.LIVES_IN[index] = address;
        }
    });
  }
  
  );