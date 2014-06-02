'use strict';
angular.module('neo4ScrumApp').controller('CustomerUpdateCtrl', function($scope,$routeParams,customerRepository,updateAddressService,updateMailService,updateTelephoneService) {
    var customerId = $routeParams.customerId;
        $scope.swapAddress = updateAddressService;
        $scope.swapMail = updateMailService;
        $scope.swapTelephone = updateTelephoneService;
    
    customerRepository.getCustomer(customerId).success(function(customer){$scope.customer = customerRepository.populateCustomer(customer);
        $scope.addressUpdater = function(address){
            var index = $scope.indexOfId($scope.customer.LIVES_IN,address.id);
            $scope.customer.LIVES_IN[index] = address;
        }
    });
  }
  
  );