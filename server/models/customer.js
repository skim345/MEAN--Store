var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
	name: {type: String, required:true},
	_orders: [{type: Schema.Types.ObjectId, ref:'Order'}],
},{timestamps:true});

mongoose.model('Customer',customerSchema);