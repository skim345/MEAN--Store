console.log('orderController');
myApp.controller('orderController', ['$scope', 'productFactory','customerFactory','orderFactory', function($scope, productFactory,customerFactory, orderFactory){
	
	$scope.errors=[];

	orderFactory.getAllOrders(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allOrders= response.orders;
		}
	})
	customerFactory.getAll(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allCustomers= response.customers;
		}
	})
	productFactory.getAllProducts(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allProducts = response.products;
		}
	})

	$scope.createOrder= function(){
		// console.log($scope.newOrder);
		orderFactory.createOrder($scope.newOrder, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.allOrders= response.orders;
			}
		})
	}

}])