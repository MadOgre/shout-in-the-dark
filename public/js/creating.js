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
        url: 'preview?q=' + vm.search
      }).then(function successCallback(response) {
          vm.returnedImages = response.data.images;
          vm.transImg = response.data.transparency;
          vm.canPreview = true;
        }, function errorCallback(response) {
          console.warn(response);
        });
    }

    vm.submitShout = function() {
      alert("Yay!");
    }
  }

}());
