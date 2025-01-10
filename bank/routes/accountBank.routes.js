const express = require('express'); // Web framework cho Node.js
const router = express.Router();
const accController = require('../controllers/accountBank.controller');

router.get('/', accController.index);

module.exports = router;