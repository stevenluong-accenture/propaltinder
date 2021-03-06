'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
  'ngRoute',
  //'rssReaderAnimations',
  'mainControllers',
  'mainFilters',
  'mainServices'
]);

mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
