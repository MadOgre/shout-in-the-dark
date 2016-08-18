(function() {
  'use strict';
  angular.module('app').controller('Main', ['$http', Main]);

  function Main($http) {
    var vm = this;
    vm.shouts = [];

    vm.currentPage = 0;

    var gettingShouts = false;

    vm.nextPage = function() {
      if (vm.shouts.length < 1) return;
      vm.getShouts();
    }

    vm.getShouts = function() {
      if (!gettingShouts) {
        gettingShouts = true;
        $http({
          method: 'GET',
          headers: {
            'Caller': 'angular'
          },
          url: '/shout?p=' + (vm.currentPage)
        }).then(function successCallback(response) {
          vm.currentPage++;
          vm.shouts = vm.shouts.concat(response.data);
          gettingShouts = false;
        }, function errorCallback(response) {
          alert('error loading shouts');
          console.warn(response);
          gettingShouts = false;
        });
      }
    }
    vm.getShouts();
  }
}());
