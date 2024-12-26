const express = require('express'); // Web framework cho Node.js
const  router = express.Router();
const detailBookController = require('../../controllers/user/detailBook.controller');

router.get('/', detailBookController.index);

module.exports = router;