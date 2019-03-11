var db = require('../db');


module.exports.add = function(req,res){
	var cartId = req.params.id;
	var sessionId = req.signedCookies.sessionId;

	if (!sessionId){
		res.redirect(req.get('referer'));
		return;
	}

	var currentCarts = db.get('session').find({id:sessionId}).get('cart').value();

	if (!currentCarts)
		db.get('session').find({id:sessionId}).set('cart',[]).write();

	currentCarts = db.get('session').find({id:sessionId}).get('cart').value();
	if (cartId in currentCarts)
		db.get('session').find({id:sessionId}).get('cart').find({cartName:cartId}).update({'number':2}).write();
	else
		db.get('session').find({id:sessionId}).get('cart').push({'cartName':cartId,'number':1}).write();
	// res.render('products/index')
	res.redirect(req.get('referer'));


};