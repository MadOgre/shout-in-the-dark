(function() {
  'use strict';
  angular.module('app').controller('Main', ['$http', Main]);

  function Main($http) {
    var vm = this;
    var shouts = [];

    vm.getShouts = function() {
      $http({
        method: 'GET',
        url: '/shout'
      }).then(function successCallback(response) {
          vm.shouts = response.data;
        }, function errorCallback(response) {
          alert('error loading shouts');
          console.warn(response);
        });
    }
    vm.getShouts();
  }
}());
