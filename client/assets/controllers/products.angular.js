console.log('productController');
myApp.controller('productController', ['$scope', 'productFactory', function($scope, productFactory){
	
	$scope.errors=[];

	productFactory.getAllProducts(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allProducts = response.products;
		}
	})

	$scope.createProduct= function(){
		console.log($scope.newProduct);
		productFactory.createProduct($scope.newProduct, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.allProducts = response.products;
				$scope.newProduct = "";
			}
		})
	}

}])