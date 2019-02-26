var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

port = 3000;

var users = [
	{
		id: 1,
		name: 'nguyen'
	},
	{
		id: 2,
		name: 'nguyen1'
	}
]
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',function(request, respond){
	respond.render('index');
});

app.get('/users',function(request,respond){
	respond.render('users/index',{
		users:users
	})
});
app.get('/users/search',function(request,respond){
	// console.log(request.query);
	var q = request.query.q;
	var matchUsers = users.filter(function(user){
		return user.name.indexOf(q)>=0;
	});
	respond.render('users/index',{users:matchUsers});
});
app.get('/users/create',function(req,res){
	res.render('users/create');
});

app.post('/users/create',function(req,res){
	// console.log(req.body);
	users.push(req.body);
	res.redirect('/users');
});
app.listen(port,function(){
	console.log('server start @ port'+ port);
});
