// var db = require('../db');

var Products = require('../models/products.model');

var pageRender = async function({req,res,prodPerPage=12,currentPage=1,numCarts = 1}={}){
	// var allProducts = db.get('products').value();

	var allProducts = await Products.find();
	var numPage = Math.ceil(allProducts.length/prodPerPage);
	res.render('products/index',{
		'Products':allProducts.slice((currentPage-1)*prodPerPage,currentPage*prodPerPage),
		'numPage': numPage,
		'currentPage': currentPage,
		'nextPage': parseInt(currentPage)+1,
		'previousPage': parseInt(currentPage)-1,
		'numCarts':numCarts
	});
} 

module.exports.index = async function(req,res){
	var obj = {req,res,prodPerPage:4, currentPage: 1,numCarts:res.locals.numCarts};
	pageRender(obj);
}

module.exports.page = async function(req,res){
	var currentPage = req.query.q;
	var obj = {req,res,prodPerPage:4,currentPage:currentPage,numCarts:res.locals.numCarts};
	pageRender(obj);

}
