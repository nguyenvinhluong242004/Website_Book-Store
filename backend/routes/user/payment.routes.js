const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/user/payment.controller');

router.post('/pre-payment', paymentController.addProductToPayment);

module.exports = router;