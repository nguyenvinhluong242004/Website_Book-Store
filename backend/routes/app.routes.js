const userRoutes = require('./user/index.routes');
//const adminRoutes = require('./admin/index.routes');

function route(app){

    //app.use('/admin', adminRoutes); // trang admin

    app.use('/', userRoutes); // trang user

}

module.exports = route;
