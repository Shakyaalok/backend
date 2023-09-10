const express = require('express')
const router = express.Router();

const shopControllers = require('../pr_06_controllers/shop')
    // console.log(path.join(__dirname))
router.get("/", shopControllers.getShop)







module.exports = router;