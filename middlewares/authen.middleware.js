var db = require('../db');

module.exports.requireAuthen = function(req,res,next){
	if (!req.cookies.userId){
		res.redirect('/authen/login');
		return;
	}

	var user= db.get('users').find({id:req.cookies.userId}).value();
	if (!user){
		res.redirect('/authen/login');
		return;
	}

	next();

};