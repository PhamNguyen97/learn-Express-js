var db = require('../db');

var pageRender = function({req,res,prodPerPage=12,currentPage=1,numCarts = 1}={}){
	var allProducts = db.get('products').value();
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

module.exports.index = function(req,res){
	var obj = {req,res,prodPerPage:12, currentPage: 1};
	pageRender(obj);
}

module.exports.page = function(req,res){
	var currentPage = req.query.q;
	var obj = {req,res,prodPerPage:12,currentPage:currentPage};
	pageRender(obj);

}
