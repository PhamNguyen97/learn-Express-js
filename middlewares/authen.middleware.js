// var db = require('../db');
var Users = require('../models/users.model');

module.exports.requireAuthen = async function(req,res,next){
	if (!req.signedCookies.userId){
		res.redirect('/authen/login');
		return;
	}

	// var user= db.get('users').find({id:req.signedCookies.userId}).value();
	var user = await Users.find({id:req.signedCookies.userId});
	if (!user){
		res.redirect('/authen/login');
		return;
	}

	res.locals.user = user;
	next();

};