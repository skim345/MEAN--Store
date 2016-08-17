var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/dashboard.html',
		controller: 'orderController' 
	})
	.when('/products', {
		templateUrl: '/partials/products.html',
		controller: 'productController'
	})
	.when('/orders', {
		templateUrl: '/partials/orders.html',
		controller: 'orderController'
	})
	.when('/customers', {
		templateUrl: '/partials/customers.html',
		controller: 'customerController'
	})	
	.otherwise({
		templateUrl: '/partials/dashboard.html'
	})
})