var db = require('../db');
var shortid = require('shortid');

module.exports.session = function(req,res, next){
	if (!req.signedCookies.sessionId){
		var sessionId = shortid.generate();
		db.get('session').push({id: sessionId}).write();
		res.cookie('sessionId',sessionId,{signed: true});
		
	}
	next();
};