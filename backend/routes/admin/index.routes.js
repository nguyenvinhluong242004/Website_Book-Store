const path = require('path'); // Xử lý đường dẫn tệp
const express = require('express');
const router = express.Router();

const statisticalRoutes = require('./statistical.routes');
const categoriesRoutes = require('./categories.routes');
const bookRoutes = require('./book.routes');


router.use('/categories', categoriesRoutes);
router.use('/books', bookRoutes);
router.use('/', statisticalRoutes);

module.exports = router;
