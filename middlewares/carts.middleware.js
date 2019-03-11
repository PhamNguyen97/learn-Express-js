var db = require('../db');

module.exports = function(req,res,next){
	var sessionId = req.signedCookies.sessionId;
	var carts = db.get('session').find({id:sessionId}).get('cart').value();
	var numCarts = 0;
	for (key in carts)
		numCarts+=carts[key];
	res.locals.numCarts = numCarts;
	next();
}