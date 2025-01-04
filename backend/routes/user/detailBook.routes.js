const express = require('express'); // Web framework cho Node.js
const  router = express.Router();
const detailBookController = require('../../controllers/user/detailBook.controller');
const uploadCloud = require('../../config/cloudinary'); 

router.post('/review', uploadCloud.array('images', 10), detailBookController.review);
router.get('/', detailBookController.index);

module.exports = router;