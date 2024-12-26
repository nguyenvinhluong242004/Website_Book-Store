const express = require('express');
const router = express.Router();
const searchRoutes = require('./search.routes');
const accountRoutes = require('./account.routes');
const cartRoutes = require('./cart.routes');

// ---------------------------------------------------------

router.use('/account', accountRoutes);
router.use('/cart', cartRoutes);


router.use('/', searchRoutes); // search



module.exports = router;
