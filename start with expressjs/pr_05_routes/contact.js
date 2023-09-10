const express = require('express')
const router = express.Router();
const path = require('path')

router.get('/contactUs', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'contact.html'))
})




module.exports = router;