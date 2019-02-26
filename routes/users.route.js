var express = require('express');
var db = require('../db');
var shortid = require('shortid');

var router = express.Router(); 

var usersRead = function (){
	return db.get('users').value();
}
var userWrite = function(obj){
	db.get('users').push(obj).write();
}

router.get('/',function(request,respond){
	respond.render('users/index',{
		users:usersRead()
	})
});
router.get('/search',function(request,respond){
	// console.log(request.query);
	var q = request.query.q;
	var matchUsers = usersRead().filter(function(user){
		return user.name.indexOf(q)>=0;
	});
	respond.render('users/index',{users:matchUsers});
});
router.get('/create',function(req,res){
	res.render('users/create');
});

router.post('/create',function(req,res){
	// console.log(req.body);
	req.body.id = shortid.generate();
	userWrite(req.body);
	// console.log(req.body);
	res.redirect('/users');
});

router.get('/:id',function(req,res){
	var id = req.params.id;
	console.log(req.params);

	var user = db.get('users').find({id: id}).value();
	// console.log(user);
	res.render('users/view',{user:user});
});

module.exports = router;