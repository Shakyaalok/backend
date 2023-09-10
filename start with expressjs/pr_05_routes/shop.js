const express = require('express')
const router = express.Router();
const path = require('path')


// console.log(path.join(__dirname))
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'shop.html'))
})







module.exports = router;