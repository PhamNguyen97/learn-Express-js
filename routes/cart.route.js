var express = require('express');
var controller = require('../controllers/cart.controller');

var router = express.Router(); 

router.get('/add/:id',controller.add);
// router.get('/page',controller.page);
// router.get('/:id',controller.);

module.exports = router;