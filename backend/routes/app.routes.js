const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./user/index.routes');
const adminRoutes = require('./admin/index.routes');

function route(app) {
    app.use('/', authRoutes); // authentication
    app.use('/', userRoutes); // trang user
    app.use('/admin', adminRoutes); // trang admin
}

module.exports = route;
