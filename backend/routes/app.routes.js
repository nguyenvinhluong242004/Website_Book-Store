const userRoutes = require('./user/index.routes');
//const adminRoutes = require('./admin/index.routes');
const registerRoutes = require('./auth/register.routes');
const authRoutes = require('./auth/auth.routes');
const logoutRoutes = require('./auth/logout.routes');
const refreshRoutes = require('./auth/refresh.routes');

function route(app){
    // AUTH
    app.use('/', registerRoutes); // register
    app.use('/', authRoutes); // authentication
    app.use('/', refreshRoutes);
    app.use('/', logoutRoutes); // logout

    //app.use('/admin', adminRoutes); // trang admin
    app.use('/', userRoutes); // trang user
}

module.exports = route;
