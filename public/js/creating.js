(function() {
  'use strict';
  angular.module('app').controller('Creating', ['$http', Creating]);

  function Creating($http) {
    var vm = this;
    vm.canPreview = false;
    vm.returnedImages = [];
    vm.search = "";
    vm.transImg = "";
    vm.curr = 0;

    vm.getImages = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:4000/preview?q=' + vm.search
      }).then(function successCallback(response) {
          vm.returnedImages = response.data.images;
          vm.transImg = "http://localhost:4000" + response.data.transparency;
          vm.canPreview = true;
        }, function errorCallback(response) {
          console.warn(response);
        });
    }
  }

}());
