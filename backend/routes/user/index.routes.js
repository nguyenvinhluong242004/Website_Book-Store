const express = require('express');
const router = express.Router();
const searchRoutes = require('./search.routes');

const accountRoutes = require('./account.routes');
const cartRoutes = require('./cart.routes');
const detailBookRoutes = require('./detailBook.routes');
const bookTypeRoutes = require('./bookType.routes');


router.use('/account', accountRoutes);
router.use('/cart', cartRoutes);
router.use('/detail-book', detailBookRoutes); // detail book
router.use('/get-list', bookTypeRoutes); // get list book by type
router.use('/search', searchRoutes); // search

module.exports = router;
