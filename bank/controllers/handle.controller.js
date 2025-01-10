const HandleModel = require('../models/handle.model');

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
}

module.exports = new DashboardController;
