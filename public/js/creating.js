(function() {
  'use strict';
  angular.module('app').controller('Creating', ['$http', Creating]);

  function Creating($http) {
    var vm = this;
    vm.canPreview = true;
    vm.returnedImages = [];
    vm.search = "";
    vm.transImg = "";
    vm.curr = 0;

    vm.getImages = function() {
      $http({
        method: 'GET',
        url: 'http://192.168.43.196:3000/preview?q=' + vm.search
      }).then(function successCallback(response) {
          vm.returnedImages = response.data.images;
          vm.transImg = "http://192.168.43.196:3000" + response.data.transparency;
        }, function errorCallback(response) {
          console.warn(response);
        });
    }
  }

}());
