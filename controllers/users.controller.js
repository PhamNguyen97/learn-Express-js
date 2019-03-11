// var db = require('../db');
// var shortid = require('shortid');

var Users = require('../models/users.model');




module.exports.index = async function(request,respond){

	respond.render('users/index',{
		users:await Users.find()
	})
};

module.exports.search = async function(request,respond){
	// console.log(request.query);
	var q = request.query.q;
	var users = await Users.find();
	var matchUsers = users.filter(function(user){
		return user.name.indexOf(q)>=0;
	});
	respond.render('users/index',{users:matchUsers});
};
module.exports.create = async function(req,res){
	console.log(req.cookies);
	res.render('users/create');
};

module.exports.postCreate= async function(req,res){
	
	// req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	var user = new Users(req.body);
	await user.save();
	res.redirect('/users');
};

module.exports.get= async function(req,res){
	var id = req.params.id;
	// console.log(req.params);

	var user = await Users.findOne({_id: id});
	// console.log(user);
	res.render('users/view',{user:user});
};