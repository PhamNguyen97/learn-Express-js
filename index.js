var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var db = require('./db');

var userRoute = require('./routes/users.route');


var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

port = 3000;



app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',function(request, respond){
	respond.render('index');
});
app.use(express.static('public'));
app.use('/users',userRoute);
app.listen(port,function(){
	console.log('server start @ port'+ port);
});
