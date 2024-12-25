const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/user/account.controller');

const verifyJWT = require('../../middlewares/auth/verifyJWT');
const verifyRole = require('../../middlewares/auth/verifyRole');

// account/profile
router.post('/profile', verifyJWT, verifyRole('user'), accountController.updateProfile);
router.get('/profile', verifyJWT, verifyRole('user'), accountController.getProfile);

// account/xxx-address
router.get('/address', verifyJWT, verifyRole('user'), accountController.getAllAddress);
router.post('/create-address', verifyJWT, verifyRole('user'), accountController.createAddress);
router.put('/update-address/:id_address', verifyJWT, verifyRole('user'), accountController.updateAddress);
router.delete('/delete-address', verifyJWT, verifyRole('user'), accountController.deleteAddress);
router.put('/password', verifyJWT, verifyRole('user'), accountController.changePassword);

module.exports = router;