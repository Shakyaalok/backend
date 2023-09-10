const express = require('express')
const router = express.Router();


const successControllers = require('../pr_06_controllers/success')

router.post('/success', successControllers.successC)





module.exports = router;