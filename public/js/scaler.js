(function(){
	'use strict';
	angular.module('app').service('scaler', Scaler);
	function Scaler() {
		var vm = this;
		vm.getRatio = function() {
			if (document.documentElement.clientWidth <= 567) {
			return document.documentElement.clientWidth / 320;
		  } else {
		  	return 1;
		  }
		}
	}
}());