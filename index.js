var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var db = require('./db');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/users.route');
var authenRoute = require('./routes/authen.route');

var authenMiddleware = require('./middlewares/authen.middleware');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('aslkaod powepolkxzcn'));
port = 3000;



app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',function(request, respond){
	respond.render('index');
});
app.use(express.static('public'));
app.use('/users',authenMiddleware.requireAuthen,userRoute);
app.use('/authen',authenRoute);
app.listen(port,function(){
	console.log('server start @ port'+ port);
});
