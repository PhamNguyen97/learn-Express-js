var db = require('../db');

module.exports.requireAuthen = function(req,res,next){
	if (!req.signedCookies.userId){
		res.redirect('/authen/login');
		return;
	}

	var user= db.get('users').find({id:req.signedCookies.userId}).value();
	if (!user){
		res.redirect('/authen/login');
		return;
	}

	res.locals.user = user;
	next();

};