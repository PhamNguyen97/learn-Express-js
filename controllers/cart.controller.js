var db = require('../db');
var Session = require('../models/session.model');

module.exports.add = async function(req,res){
	var cartId = req.params.id;
	var sessionId = req.signedCookies.sessionId;

	if (!sessionId){
		res.redirect(req.get('referer'));
		return;
	}

	// var currentCarts = db.get('session').find({id:sessionId}).get('cart').value();

	// if (!currentCarts)
	// 	db.get('session').find({id:sessionId}).set('cart',[]).write();

	// var currentCarts = db.get('session').find({id:sessionId}).get('cart').value();
	var currentSession = await Session.findOne({_id: sessionId});
	var currentCarts = currentSession.carts;
	var cart = currentCarts.find(function(cart){
		return cart.cartName === cartId;
	});
	if (cart !== undefined)
		cart.number+=1;
	else
		currentCarts.push({cartName: cartId,number: 1})

	currentSession.carts = currentCarts;
	await currentSession.save();
	// db.get('session').find({id:sessionId}).set('cart.'+cartId,cartId in currentCarts ? currentCarts[cartId]+1:1).write();
	// res.render('products/index')
	res.redirect(req.get('referer'));


};