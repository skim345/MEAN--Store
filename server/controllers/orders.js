var Product = mongoose.model('Product');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');


module.exports = (function(){
	return{
		// get all orders
		getAllOrders: function(req, res){
			Order.find({}, function(err, orders){
				if(err){
					console.log(err);
					var errorsArray=[];
					for(var i in err.errors){
						errorsArray.push(err.errors);
					}
					res.json({status:fasle, errors:errorsArray});
				}else{
					res.json({status:true, orders:orders});
				}
			})
		},
		// create a new order
		createOrder: function(req, res){
			// create a new order
			var newOrder = new Order({name: req.body.newName, product: req.body.product, quantity: req.body.quantity});

			// find the customer who made the order and update with new order info
			Customer.findOneAndUpdate({name: req.body.newName},{$push:{"_orders": newOrder}},function(err,customer){

				if(err){
					var errorsArray=[];
					for(var i in err.errors){
						errorsArray.push(err.errors);
					}
					res.json({status:false, errors:errorsArray});	
				}else{
					// save the new order
					newOrder.save(function(err, order){

						if(err){
							var errorsArray=[];
							for(var i in err.errors){
								errorsArray.push(err.errors);
							}
							res.json({status:false, errors:errorsArray});
						}else{
							// update the new order with customer information
							Order.findOneAndUpdate({_id: order._id},{$set:{"_customer": customer}}, function(err, order){
								if(err){
									var errorsArray=[];
									for(var i in err.errors){
										errorsArray.push(err.errors);
									}
									res.json({status:false, errors:errorsArray});	
								}else{
									// find the product ordered
									Product.findOne({item: req.body.product}, function(err, product){
										if(err){
											var errorsArray=[];
											for(var i in err.errors){
												errorsArray.push(err.errors);
											}
											res.json({status:false, errors:errorsArray});
										}else{
											// product is found, now find out how many quantities of the item we have in stock
											var newQuantity= product.quantity-req.body.quantity;
											if(newQuantity<=0){
												// if stock is less than or equal to 0, we have no more stock- sold out
												res.json({status: false, errors: "Unable to fill quantity request"});
											}else{
												// if product found and quanity is not less than or equal to zero, update quantity
												Product.findOneAndUpdate({_id:product._id},{$set:{quantity: newQuantity}}, function(err){
													if(err){
														var errorsArray=[];
														for(var i in err.errors){
															errorsArray.push(err.errors);
														}
														res.json({status:false, errors:errorsArray});
													}else{
														// find all orders and send to front
														Order.find({}, function(err, orders){
															if(err){
																var errorsArray=[];
																for(var i in err.errors){
																	errorsArray.push(err.errors);
																}
																res.json({status:false, errors:errorsArray});
															}else{
																res.json({status: true, orders:orders});
															}
														})
													}
												})
											}
											
										}
									})
								}
							})
						}
					})
				}
			})


			


		}

	}
})()