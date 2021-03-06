require('dotenv').config();

console.log(process.env.SESSION_SECRET);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);

var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var csrf = require('csurf');


// var db = require('./db');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/users.route');
var authenRoute = require('./routes/authen.route');
var productsRoute = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');

var authenMiddleware = require('./middlewares/authen.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
var cartsMiddleware = require('./middlewares/carts.middleware');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware.session);
app.use(csrf({ cookie: true }))

port = 3000;



app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',function(request, respond){
	respond.render('index');
});
app.use(express.static('public'));
app.use('/users',authenMiddleware.requireAuthen,userRoute);
app.use('/authen',authenRoute);
app.use('/products',cartsMiddleware,productsRoute);
app.use('/cart',cartRoute);
app.listen(port,function(){
	console.log('server start @ port'+ port);
});
