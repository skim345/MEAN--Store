var Order = mongoose.model('Order');
// var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');


module.exports = (function(){
	return{
    // get all products
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
    // create new product
		create: function(req, res){
      // creat new product
  		var newProduct = new Product({item: req.body.item, quantity: req.body.quantity, image: req.body.image, description: req.body.description});
      // save product
  		newProduct.save(function(err, newProduct){
  			if(err){
  				var errorsArray= [];
  				for(var i in err.errors){
  					errorsArray.push(err.errors);
  				}
  				res.json({status: false, errors: errorsArray});
  			}else{
          // get all products and send to front
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