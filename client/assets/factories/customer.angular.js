console.log('customerFactory');
myApp.factory('customerFactory', function($http){
	var factory={}

	factory.add= function(customerInfo, callback){
		$http.post('/addCustomer', customerInfo).success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}

	factory.getAll= function(callback){
		$http.get('/allCustomers').success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}

	factory.destroy = function(customerId, callback){
		$http.post('/destroy/'+customerId).success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}

	return factory;
})

