const express = require('express'); // Web framework cho Node.js
const  router = express.Router();
const homeController = require('../../controllers/user/home.controller');

router.get('/', homeController.index);

module.exports = router;