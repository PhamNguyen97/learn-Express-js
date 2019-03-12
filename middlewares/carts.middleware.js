var db = require('../db');
var Session = require('../models/session.model');

module.exports = async function(req,res,next){
	var sessionId = req.signedCookies.sessionId;
	// var carts = db.get('session').find({_id:sessionId}).get('cart').value();
	var currentSession = await Session.findOne({_id: sessionId});
	var carts = currentSession.carts;
	carts.shift(1);
	var numCarts = carts.reduce(function(before,after){
		return before+after.number;
	},0);
	res.locals.numCarts = numCarts;
	next();
}