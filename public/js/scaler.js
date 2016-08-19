(function(){
	'use strict';
	angular.module('app').service('scaler', Scaler);
	function Scaler() {
		var vm = this;
		vm.getRatio = function() {
			if (screen.width <= 567) {
			return screen.width / 320;
		  } else {
		  	return 1;
		  }
		}
	}
}());