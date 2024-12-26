const express = require('express');
const router = express.Router();
const searchRoutes = require('./search.routes');
<<<<<<< HEAD
const accountRoutes = require('./account.routes');
const cartRoutes = require('./cart.routes');

// ---------------------------------------------------------

router.use('/account', accountRoutes);
router.use('/cart', cartRoutes);


router.use('/', searchRoutes); // search
=======
const detailBookRoutes = require('./detailBook.routes');
const bookTypeRoutes = require('./bookType.routes');

// ---------------------------------------------------------

router.use('/detail-book', detailBookRoutes); // detail book
router.use('/get-list', bookTypeRoutes); // get list book by type
router.use('/search', searchRoutes); // search
>>>>>>> 3fc1f402bf8eeb30b59c362b4ce25f5399804738



module.exports = router;
