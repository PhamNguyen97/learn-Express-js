var express = require('express');
var controller = require('../controllers/products.controller');

var router = express.Router(); 

router.get('/',controller.index);
router.get('/:id',controller.page);

module.exports = router;