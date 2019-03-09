var express = require('express');
var controller = require('../controllers/users.controller');
var validate = require('../validate/users.validate');
var multer = require('multer');
var upload = multer({dest: './public/uploads'});

var router = express.Router(); 



router.get('/',controller.index);

router.get('/cookie',function(req,res,next){
	res.cookie('user-id',123213);
	res.send('Unknown User');
});

router.get('/search',controller.search);

router.get('/create',controller.create);

router.post('/create',
	upload.single('avatar'),
	validate.postCreate,
	controller.postCreate);

router.get('/:id',controller.get);

module.exports = router;