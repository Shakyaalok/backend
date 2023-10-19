const orderModels = require('../models/orderModels')
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');



const generatewebToken = (id, name, ispremiumuser) => {
    return jwt.sign({ userId: id, name: name, ispremiumuser }, 'secretKey')
}


const purchasepremium = async(req, res) => {
    try {
        const rzp = new Razorpay({
            key_id: "rzp_test_0cprP8W6d4Pk0k",
            key_secret: "fko5GMbOchVd9jHVv7yWbPZD"

        });

        const amount = 250000;

        rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
            if (err) {
                console.error('Error in payment', err);
                return res.status(500).json({ message: 'Payment error' });
            }

            req.user.createOrder({ orderid: order.id, status: 'PENDING' })
                .then(() => {
                    res.status(201).json({ order, key_id: rzp.key_id });
                })
                .catch((err) => {
                    console.error('Error in orderControllers.js', err);
                    res.status(500).json({ message: 'Order creation error' });
                });
        });
    } catch (err) {
        console.error('Something went wrong', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateTransactions = async(req, res) => {

    try {
        const userId = req.user.id;
        const { payment_id, order_id } = req.body;
        const order = await orderModels.findOne({ where: { orderid: order_id } });
        await order.update({ paymentid: payment_id, status: "Successfull" });

        await req.user.update({ ispremiumuser: true });


        // passing the new updated token
        res.status(202).json({ success: true, message: "Transaction Successful", token: generatewebToken(userId, undefined, true) });
    } catch (err) {

        res.status(500).json({ message: "Something went wrong " });
    }
};




module.exports = { purchasepremium, updateTransactions };