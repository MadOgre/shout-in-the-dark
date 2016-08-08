(function() {
  'use strict';
  angular.module('app').controller('Creating', ['$http', '$location', '$window', 'textify', Creating]);

  function Creating($http, $location, $window, textify) {
    var vm = this;
    vm.canPreview = false;
    vm.isLoading = false;
    vm.returnedImages = [];
    vm.search = "";
    vm.transImg = "";
    vm.curr = 0;

    vm.getImages = function() {
      vm.isLoading = true;
      $http({
        method: 'GET',
        url: '/preview?q=' + vm.search
      }).then(function successCallback(response) {
          vm.isLoading = false;
          vm.returnedImages = response.data.images;
          vm.transImg = response.data.transparency;
          vm.canPreview = true;
          textify.drawPreview(vm.search);
          vm.textifyImage();
        }, function errorCallback(response) {
          vm.isLoading = false;
          console.warn(response);
        });
    }

    vm.submitShout = function() {
      alert("Yay!");
    }

    vm.postShout = function() {
      vm.isLoading = true;
      $window.open(angular.element('#dataHolder').data("imageData"));
      vm.isLoading = false;
      // $http({
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   url: '/shout',
      //   data: {bodyText: vm.search, imageUrl: vm.returnedImages[vm.curr].full}
      // }).then(function successCallback(response) {
      //     vm.isLoading = false;
      //     if(response.status == 200) {
      //       $location.path('/');
      //     }
      // }, function errorCallback(response) {
      //   vm.isLoading = false;
      //   alert('something went wrong');
      //   console.warn(response);
      // });
    }

    vm.textifyImage = function() {
        textify.drawFull(vm.returnedImages[vm.curr].full, vm.search);
    }

  }

}());
