const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/auth/logout.controller');

router.post('/logout', logoutController.handleLogout);

module.exports = router;
