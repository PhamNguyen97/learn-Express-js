var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
	sessionId: String,
	carts:[{
		cartName: String,
		number: Number
	}]
});

var Session = mongoose.model('Session',sessionSchema,'session');
module.exports = Session;