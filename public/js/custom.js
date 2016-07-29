angular.module("myApp",['ngRoute', 'ngAnimate']);

angular.module("myApp").controller("routeController",function(){

});

angular.module("myApp").controller("helloCtrl",function(){
	
});

angular.module("myApp").controller("goodbyeCtrl",function(){
	
});

angular.module("myApp").config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when("/hello", {
			templateUrl: "/hello.html",
			controller: "helloCtrl",
			controllerAs: "ctrl"
		})
		.when("/goodbye", {
			templateUrl: "/goodbye.html",
			controller: "goodbyeCtrl",
			controllerAs: "ctrl"
		});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true,
		rewriteLinks: true
	});
}]);

