console.log('productFactory');
myApp.factory('productFactory', function($http){
	var factory={}

	factory.getAllProducts= function(callback){
		$http.get('/getAll').success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}

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