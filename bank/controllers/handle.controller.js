const HandleModel = require('../models/handle.model');
const AccountBank = require('../models/accountBank.model');

class DashboardController {
    async register(req, res) {
        const { email } = req.body;

        console.log(email)

        try {
            await HandleModel.createRequest(email);

            res.status(200).send('Success');
        } catch (error) {
            console.error(error);
            res.status(200).send('Server Error');
        }
    }

    async pay(req, res) {
        const { email, id_invoice, amount } = req.body;

        console.log(email, id_invoice, amount)

        try {
            await HandleModel.processPayment(email, id_invoice, amount);

            res.status(200).send('Success');
        } catch (error) {
            console.error(error);
            res.status(200).send('Server Error');
        }
    }

    async get(req, res) {
        const { email = '', page = 1 } = req.body;
        const perPage = 7;

        try {
            const balance = await AccountBank.getAmount(email);
            const result = await AccountBank.getUserTransactionHistory(email, page, perPage);

            res.json({
                balance: balance,
                per_page: result.per_page,
                total_pages: result.total_pages,
                current_page: result.current_page,
                total_records: result.total_records,
                data: result.data
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new DashboardController;
