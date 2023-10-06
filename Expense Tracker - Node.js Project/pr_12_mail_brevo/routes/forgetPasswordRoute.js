const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth')
const { forgetPassword } = require('../controllers/forgetPasswordControllers')


router.use(authenticate)

router.get('/forgotpassword', forgetPassword);



module.exports = router