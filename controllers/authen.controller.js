var md5 = require('md5');
var db = require('../db');


module.exports.login = function(req,res,next){
	res.render('authen/login');
};


module.exports.postLogin = function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email: email}).value();

	if (!user){
		res.render('authen/login',{
			errors: ['User dost not exist'],
			values: req.body		
		});
		return;
	}

	var hashedPassword = md5(password);
	if (user.password!==hashedPassword){
		res.render('authen/login',{
			errors:['Wrong password'],
			values: req.body
		});
	}
	res.cookie('userId',user.id,{signed: true});
	res.redirect('/users');
};