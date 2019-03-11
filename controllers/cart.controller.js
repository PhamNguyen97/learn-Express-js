var db = require('../db');


module.exports.add = function(req,res){
	var cartId = req.params.id;
	var sessionId = req.signedCookies.sessionId;

	if (!sessionId){
		res.redirect(req.get('referer'));
		return;
	}

	// var currentCarts = db.get('session').find({id:sessionId}).get('cart').value();

	// if (!currentCarts)
	// 	db.get('session').find({id:sessionId}).set('cart',[]).write();

	var currentCarts = db.get('session').find({id:sessionId}).get('cart').value();
	db.get('session').find({id:sessionId}).set('cart.'+cartId,cartId in currentCarts ? currentCarts[cartId]+1:1).write();
	// res.render('products/index')
	res.redirect(req.get('referer'));


};