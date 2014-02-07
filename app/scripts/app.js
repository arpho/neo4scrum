'use strict';

angular.module('neo4ScrumApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/projects.html',
        controller: 'MainCtrl'
      }).when('/customers',{
        templateUrl:'views/customers.html',
        controller:'CustomerListCtrl'
    }).when('/customer/:customerId',{
        templateUrl: 'views/customer.html',
        controller: 'CustomerCtrl'
    })
      .otherwise({
        redirectTo: '/'
      });
  });
