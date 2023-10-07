const express = require('express');
const router = express.Router();
const { forgetPassword, updatepassword, resetpassword } = require('../controllers/forgetPasswordControllers')



router.post('/updatepassword/:resetpasswordid', updatepassword);
// router.get('/resetpassword/:id', resetpassword);
router.post('/forgotpassword', forgetPassword);



module.exports = router