'use strict';
angular.module('neo4ScrumApp').controller('CustomerUpdateCtrl', function($scope,$routeParams,customerRepository) {
    var customerId = $routeParams.customerId; 
    customerRepository.getCustomer(customerId).success(function(customer){$scope.customer = customerRepository.populateCustomer(customer);});
  }
  
  );