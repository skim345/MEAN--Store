var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
	name: {type: String, required: true},
	product: {type: String, required: true},
	quantity: {type: Number, required: true},
	_customer: [{type: Schema.Types.ObjectId, ref:'Customer'}],
},{timestamps:true});

mongoose.model('Order',orderSchema);