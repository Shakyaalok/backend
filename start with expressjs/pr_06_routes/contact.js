const express = require('express')
const router = express.Router();

const contactControllers = require('../pr_06_controllers/contact')
router.get('/contactUs', contactControllers.getcontact)




module.exports = router;