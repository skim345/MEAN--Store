var Order = mongoose.model('Order');
// var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');


module.exports = (function(){
	return{

		getAll: function(req, res){
			Product.find({}, function(err, products){
				if(err){
					var errorsArray= [];
  					for(var i in err.errors){
  					errorsArray.push(err.errors);
  					}
  					res.json({status: false, errors: errorsArray});
				}else{
					res.json({status: true, products:products});
				}
			})
		},

		create: function(req, res){
			// console.log(req.body);
			// {item: 'Flowers',
  	// 		image: 'https://unsplash.it/200/300/?random',
  	// 		description: 'Flowers',
  	// 		quantity: 100 }
  		var newProduct = new Product({item: req.body.item, quantity: req.body.quantity, image: req.body.image, description: req.body.description});
  		newProduct.save(function(err, newProduct){
  			if(err){
  				var errorsArray= [];
  				for(var i in err.errors){
  					errorsArray.push(err.errors);
  				}
  				res.json({status: false, errors: errorsArray});
  			}else{
  				Product.find({}, function(err, products){
  					if(err){
  						var errorsArray=[];
  						for(var i in err.errors){
  							errorsArray.push(err.errors);
  						}
  						res.json({status: false, errors: errorsArray});
  					}else{
  						res.json({status: true, products: products});
  					}
  				})
  			}
  		})

		}

	}
})()