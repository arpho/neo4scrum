'use strict';

angular.module('neo4ScrumApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
    'fundoo.services'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/projects.html',
        controller: 'MainCtrl'
      }).when('/customers',{
        templateUrl:'views/customers.html',
        controller:'CustomersListCtrl'
    }).when('/customer/:customerId',{
        templateUrl: 'views/customer.html',
        controller: 'CustomerUpdateCtrl'
    })
      .otherwise({
        redirectTo: '/'
      });
  });
