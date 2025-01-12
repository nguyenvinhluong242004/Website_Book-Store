const path = require('path'); 
const express = require('express');
const router = express.Router();

const verifyJWT = require('../../middlewares/auth/verifyJWT');
const verifyRole = require('../../middlewares/auth/verifyRole');

const searchRoutes = require('./search.routes');
const accountRoutes = require('./account.routes');
const cartRoutes = require('./cart.routes');
const detailBookRoutes = require('./detailBook.routes');
const bookTypeRoutes = require('./bookType.routes');
const homeRoutes = require('./home.routes');

router.use('/cart', cartRoutes);
router.use('/account', verifyJWT, verifyRole('user'), accountRoutes);
router.use('/detail-book', detailBookRoutes); 
router.use('/get-list', bookTypeRoutes); 
router.use('/search', searchRoutes);
router.use('/', homeRoutes);

module.exports = router;
