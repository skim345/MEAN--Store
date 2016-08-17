var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');
module.exports = (function(){
	return{



		add: function(req,res){
			// console.log(req.body);
			var newCustomer = new Customer({name: req.body.name});
			newCustomer.save(function(err){
				if(err){
					console.log(err);
					var errorsArray= [];
					for(var i in err.errors){
						errorsArray.push(err.errors);
					}
					res.json({status: false, errors: errorsArray});
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

		destroy: function(req, res){
			// console.log(req.params.id);
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