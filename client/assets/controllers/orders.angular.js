console.log('orderController');
myApp.controller('orderController', ['$scope', 'productFactory','customerFactory','orderFactory', function($scope, productFactory,customerFactory, orderFactory){
	
	$scope.errors=[];

	// Get all orders
	orderFactory.getAllOrders(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allOrders= response.orders;
		}
	})
	// get all customers
	customerFactory.getAll(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allCustomers= response.customers;
		}
	})
	// get all products
	productFactory.getAllProducts(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allProducts = response.products;
		}
	})
	// create an order
	$scope.createOrder= function(){
		orderFactory.createOrder($scope.newOrder, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.allOrders= response.orders;
			}
		})
	}

}])