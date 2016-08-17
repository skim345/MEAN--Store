var Product = mongoose.model('Product');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');


module.exports = (function(){
	return{

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

		createOrder: function(req, res){
			// console.log(req.body);
			// { 
			// 	newName: 'Enrique Jocson',
			// 	product: 'Flowers',
			// 	quantity: 5 
			// }
			var newOrder = new Order({name: req.body.newName, product: req.body.product, quantity: req.body.quantity});
			// console.log(newOrder);
			// { name: 'Gary Tam',product: 'Flowers',quantity: 7,_id: 578ffa38f0c4dba0191e715e,_customer: [] }
			Customer.findOneAndUpdate({name: req.body.newName},{$push:{"_orders": newOrder}},function(err,customer){
				// console.log(customer);
				// { _id: 578fed9a195674b8084543e9,
				// 	updatedAt: 2016-07-20T21:40:10.998Z,
				// 	createdAt: 2016-07-20T21:31:06.897Z,
				// 	name: 'Sophia Kim',
				// 	__v: 0,
				// 	_orders:
				// 	[ 578fedad195674b8084543ea,
				// 	578fefba72ff57201e62261b,
				// 	578fefba72ff57201e62261c ] 
				// }
				if(err){
					var errorsArray=[];
					for(var i in err.errors){
						errorsArray.push(err.errors);
					}
					res.json({status:false, errors:errorsArray});	
				}else{
					newOrder.save(function(err, order){
						// console.log(order);
						// { __v: 0,
						//   updatedAt: 2016-07-20T22:42:00.134Z,
						//   createdAt: 2016-07-20T22:42:00.134Z,
						//   name: 'Sophia Kim',
						//   product: 'Nike Shoes',
						//   quantity: 2,
						//   _id: 578ffe3875a3cf3c221cbb13,
						//   _customer: [] }
						if(err){
							var errorsArray=[];
							for(var i in err.errors){
								errorsArray.push(err.errors);
							}
							res.json({status:false, errors:errorsArray});
						}else{
							Order.findOneAndUpdate({_id: order._id},{$set:{"_customer": customer}}, function(err, order){
								if(err){
									var errorsArray=[];
									for(var i in err.errors){
										errorsArray.push(err.errors);
									}
									res.json({status:false, errors:errorsArray});	
								}else{
									Product.findOne({item: req.body.product}, function(err, product){
										if(err){
											var errorsArray=[];
											for(var i in err.errors){
												errorsArray.push(err.errors);
											}
											res.json({status:false, errors:errorsArray});
										}else{
											var newQuantity= product.quantity-req.body.quantity;
											// console.log(newQuantity);
											if(newQuantity<=0){
												res.json({status: false, errors: "Unable to fill quantity request"});
											}else{
												Product.findOneAndUpdate({_id:product._id},{$set:{quantity: newQuantity}}, function(err){
													if(err){
														var errorsArray=[];
														for(var i in err.errors){
															errorsArray.push(err.errors);
														}
														res.json({status:false, errors:errorsArray});
													}else{
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