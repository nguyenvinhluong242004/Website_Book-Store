const express = require('express');
const router = express.Router();
const searchRoutes = require('./search.routes');

// ---------------------------------------------------------

router.use('/', searchRoutes); // search


module.exports = router;
