const express = require('express')
const router = express.Router();
const path = require('path')


// console.log(path.join(__dirname))
// use handles all the methods like get,post,...
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'error.html'))
})







module.exports = router;