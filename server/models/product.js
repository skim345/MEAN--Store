var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
	item: {type: String, required: true},
	quantity: {type: Number, required: true},
	image:{type: String},
	description:{type: String},
	_orders: [{type: Schema.Types.ObjectId, ref:'Order'}],
},{timestamps:true});

mongoose.model('Product',productSchema);