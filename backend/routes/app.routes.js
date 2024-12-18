const userRoutes = require('./user/index.routes');
//const adminRoutes = require('./admin/index.routes');
const registerRoutes = require('./auth/register.routes');

function route(app){
    // AUTH
    app.use('/', registerRoutes); // register

    //app.use('/admin', adminRoutes); // trang admin
    app.use('/', userRoutes); // trang user
}

module.exports = route;
