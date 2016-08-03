(function() {
  'use strict';
  angular.module('app')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when("/", {
        templateUrl: "/partials/main.html",
        controller: "Main",
        controllerAs: "main"
      })
      .when("/create", {
        templateUrl: "/partials/create.html",
        controller: "Creating",
        controllerAs: "create"
      })
      .otherwise({
        redirectTo: '/'
      });


    $locationProvider.html5Mode(true).hashPrefix('!');
  }]);
}());
