console.log('productFactory');
myApp.factory('productFactory', function($http){
	var factory={}

	// get all products
	factory.getAllProducts= function(callback){
		$http.get('/getAll').success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}

	// create product
	factory.createProduct= function(newProduct, callback){
		$http.post('/createProduct', newProduct).success(function(response){
			if(!response.status){
				callback(response)
			}else{
				callback(response);
			}
		})
	}

	return factory;
})