console.log('customerFactory');
myApp.factory('customerFactory', function($http){
	var factory={}

	// add a new customer
	factory.add= function(customerInfo, callback){
		$http.post('/addCustomer', customerInfo).success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	// get all customers
	factory.getAll= function(callback){
		$http.get('/allCustomers').success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	// destroy specific customer
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

