// var db = require('../db');
var Session = require('../models/session.model');
// var shortid = require('shortid');

module.exports.session = async function(req,res, next){
	if (!req.signedCookies.sessionId){
		// var sessionId = shortid.generate();
		var newSession = new Session({carts:{}});
		await newSession.save();
		sessionId = newSession._id;
		//db.get('session').push({id: sessionId}).write();
		res.cookie('sessionId',sessionId,{signed: true});
		
	}
	next();
};