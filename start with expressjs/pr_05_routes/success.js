const express = require('express')
const router = express.Router();
const path = require('path')
router.post('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'success.html'))
})





module.exports = router;