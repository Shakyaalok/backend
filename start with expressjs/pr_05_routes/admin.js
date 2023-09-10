const express = require('express')
const router = express.Router();
const path = require('path')

router.get("/add-product", (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'add-product.html'));
})







module.exports = router;