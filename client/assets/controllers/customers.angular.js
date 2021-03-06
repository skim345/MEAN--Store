console.log('customerController');
myApp.controller('customerController', ['$scope', 'customerFactory', function($scope, customerFactory){
	$scope.errors = [];
	$scope.customers = [];

	$scope.add = function(){
		// add new customer
		customerFactory.add($scope.newCustomer, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.customers=response.customers;
				$scope.newCustomer = "";
			}
		})
	}

	$scope.destroy = function(customer){
		// delete a customer
		customerFactory.destroy(customer._id, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.customers=response.customers;
			}
		})
	}

	customerFactory.getAll(function(response){
		// get all customers
		if(!response.status){
				$scope.errors.push(response.errors);
		}else{
			$scope.customers=response.customers;
		}
	})
}])