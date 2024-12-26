const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/user/cart.controller');

router.post('/add', cartController.addProduct);

module.exports = router;