console.log('orderFactory');
myApp.factory('orderFactory', function($http){
	var factory={}

	// create a new order
	factory.createOrder=function(orderInfo, callback){
		$http.post('/createOrder', orderInfo).success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	// get all orders
	factory.getAllOrders=function(callback){
		$http.get('/getAllOrders').success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	

	return factory;
})