var express = require('express');
var controller = require('../controllers/products.controller');

var router = express.Router(); 

router.get('/',controller.index);
router.get('/page',controller.page);
// router.get('/:id',controller.);

module.exports = router;