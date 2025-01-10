const home = require('./home.routes');
const transaction = require('./transaction.routes');
const accountBank = require('./accountBank.routes');
const accountReq = require('./accountReq.routes');

function route(app) {
    
    app.use('/acc-request', accountReq);
    app.use('/transaction', transaction);
    app.use('/acc-bank', accountBank);
    app.use('/', home);

}

module.exports = route;