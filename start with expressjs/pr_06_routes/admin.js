const express = require('express')
const router = express.Router();


const productControllers = require('../pr_06_controllers/products')

router.get("/add-product", productControllers.getAddProduct)







module.exports = router;