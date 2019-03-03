var express = require('express');
var controller = require('../controllers/users.controller');
var validate = require('../validate/users.validate');
var router = express.Router(); 



router.get('/',controller.index);

router.get('/cookie',function(req,res,next){
	res.cookie('user-id',123213);
	res.send('Unknown User');
});

router.get('/search',controller.search);

router.get('/create',controller.create);

router.post('/create',validate.postCreate,controller.postCreate);

router.get('/:id',controller.get);

module.exports = router;