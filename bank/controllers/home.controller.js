const HomeModel = require('../models/home.model');

class DashboardController {
    async index(req, res) {
        try {
            const balance = await HomeModel.getAmount();
            const transaction = await HomeModel.getLatestTransactions();
            console.log(transaction)
            // Render view
            res.render('home', {
                title: 'Trang chủ',
                balance: balance,
                transaction: transaction
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new DashboardController;
