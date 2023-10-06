const express = require('express');
const router = express.Router();
const { purchasepremium, updateTransactions } = require('../controllers/orderControllers');
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)

router.get('/payment', purchasepremium);
router.post('/updatetransactions', updateTransactions)






module.exports = router;