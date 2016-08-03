angular.module("myApp",['ngRoute']);

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
