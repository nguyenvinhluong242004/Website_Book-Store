const express = require('express'); // Web framework cho Node.js
const router = express.Router();
const posterController = require('../../controllers/admin/poster.controller');

router.post('/add', posterController.addPoster);
router.get('/', posterController.getAllPoster);

module.exports = router;