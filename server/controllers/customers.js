var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');
module.exports = (function(){
	return{

		// add a new customer
		add: function(req,res){
			// creating new customer
			var newCustomer = new Customer({name: req.body.name});
			// saving new customer
			newCustomer.save(function(err){
				if(err){
					console.log(err);
					var errorsArray= [];
					for(var i in err.errors){
						errorsArray.push(err.errors);
					}
					res.json({status: false, errors: errorsArray});
				}else{
					// find all customer information and send to front
					Customer.find({}, function(err, customers){
						if(err){
							console.log(err);
							var errorsArray= [];
							for(var i in err.errors){
								errorsArray.push(err.errors);
							}
							res.json({status: false, errors:errorsArray});
						}else{
							res.json({status: true, customers: customers});
						}
					})
				}
			})
		},
		// delete customer
		destroy: function(req, res){
			Customer.remove({_id: req.params.id}, function(err){
				if(err){
					console.log(err);
					var errorsArray= [];
					for(var i in err.errors){
						errorsArray.push(err.errors);
					}
					res.json({status: false, errors:errorsArray});
				}else{
					Customer.find({}, function(err, customers){
						if(err){
							console.log(err);
							var errorsArray= [];
							for(var i in err.errors){
								errorsArray.push(err.errors);
							}
							res.json({status: false, errors:errorsArray});
						}else{
							res.json({status: true, customers: customers});
						}
					})
				}
			})
		},
		// get all customers
		getAll: function(req, res){
			Customer.find({}, function(err, customers){
				if(err){
					console.log(err);
					var errorsArray= [];
					for(var i in err.errors){
						errorsArray.push(err.errors);
					}
					res.json({status: false, errors:errorsArray});
				}else{
					res.json({status: true, customers: customers});
				}
			})
		}


	}
})()