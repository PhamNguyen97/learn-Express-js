var db = require('../db');
var shortid = require('shortid');

var usersRead = function (){
	return db.get('users').value();
}
var userWrite = function(obj){
	db.get('users').push(obj).write();
}


module.exports.index = function(request,respond){
	respond.render('users/index',{
		users:usersRead()
	})
};

module.exports.search = function(request,respond){
	// console.log(request.query);
	var q = request.query.q;
	var matchUsers = usersRead().filter(function(user){
		return user.name.indexOf(q)>=0;
	});
	respond.render('users/index',{users:matchUsers});
};
module.exports.create = function(req,res){
	res.render('users/create');
};

module.exports.postCreate=function(req,res){
	var errors=[];
	req.body.id = shortid.generate();

	if (!req.body.name)
		errors.push('Name is required');
	if (!req.body.phone)
		errors.push('Phone is required');

	if (errors.length)
	{
		res.render('users/create',{
			errors:errors,
			values: req.body
		});
		return;
	}

	userWrite(req.body);
	res.redirect('/users');
};

module.exports.get= function(req,res){
	var id = req.params.id;
	console.log(req.params);

	var user = db.get('users').find({id: id}).value();
	// console.log(user);
	res.render('users/view',{user:user});
};