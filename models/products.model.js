var mongoose = require('mongoose');


var productsSchema = new mongoose.Schema({
	name: String,
	image:String,
	discription: String
});

var Products = mongoose.model("Products",productsSchema,'products');

module.exports = Products