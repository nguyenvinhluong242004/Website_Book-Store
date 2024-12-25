const express = require('express');
const router = express.Router();
const searchRoutes = require('./search.routes');
const accountRoutes = require('./account.routes');

// ---------------------------------------------------------

router.use('/account', accountRoutes);

router.use('/', searchRoutes); // search



module.exports = router;
