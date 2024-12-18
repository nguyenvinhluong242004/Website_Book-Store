const express = require('express');
const router = express.Router();
const refreshController = require('../../controllers/auth/refresh.controller');

router.get('/refresh', refreshController.handleRefreshToken);

module.exports = router;
