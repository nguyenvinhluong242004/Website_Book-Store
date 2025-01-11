const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/user/account.controller');

// account/...
router.put('/profile', accountController.updateProfile);
router.get('/profile', accountController.getProfile);
router.get('/address', accountController.getAllAddress);
router.post('/create-address', accountController.createAddress);
router.put('/update-address/:id_address', accountController.updateAddress);
router.delete('/delete-address', accountController.deleteAddress);
router.put('/password', accountController.changePassword);
router.get('/my-order', accountController.getMyOrder);
router.get('/my-order/detail/:id_order', accountController.getDetailOrder);

module.exports = router;