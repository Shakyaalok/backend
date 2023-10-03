const orderModel = require('../models/orderModels')
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');

// these was the two error functions
/*

const purchasepremium = async(req, res) => {


    try {
        var rzp = new Razorpay({
            key_id: "rzp_test_aVf5rSYB4HGaXh",
            key_secret: "x6SXA8P2PJTVd4lKMzluKsNR"
        })

        const amount = 2500;

        rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
            if (err) {
                console.log('error in payment', err)
            }


            req.user.createOrder({ orderid: order.id, status: 'PENDING' })
                .then(() => {
                    res.status(201).json({ order, key_id: rzp.key_id })
                })
                .catch(err => {
                    console.log('error in orderControllers.js', err)
                })
        })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong " });
    }

}







const updateTransactions = async(req, res) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id } = req.body;
        console.log('------------------------------------>', req.body)
        const order = await orderModel.findOne({ where: { orderid: order_id } })
        const promise1 = orderModel.update({ paymentid: payment_id, status: 'SUCCESSFUL' })
        const promise2 = req.user.update({ ispremiumuser: true })

        Promise.all([promise1, promise2]).then(() => {
            return res.status(202).json({ success: true, message: "Transaction Successful" });
        }).catch((error) => {
          
            throw new Error(error)
        })
    } catch (err) {
        res.status(402).json({ success: false, message: err });
    }
}

module.exports = { purchasepremium, updateTransactions };
*/



const purchasepremium = async(req, res) => {
    try {
        const rzp = new Razorpay({
            key_id: "rzp_test_aVf5rSYB4HGaXh",
            key_secret: "x6SXA8P2PJTVd4lKMzluKsNR"

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
        const { payment_id, order_id } = req.body;
        console.log('payment_id#######################################', payment_id)
        const order = await orderModel.findOne({ where: { orderid: order_id } });
        await order.update({ paymentid: payment_id, status: "Successfull" });

        await req.user.update({ ispremiumuser: true });

        res.status(202).json({ success: true, message: "Transaction Successful" });
    } catch (err) {

        res.status(500).json({ message: "Something went wrong " });
    }
};

module.exports = { purchasepremium, updateTransactions };