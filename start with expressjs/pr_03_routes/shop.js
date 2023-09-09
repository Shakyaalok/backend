const express = require('express');
const router = express.Router();


// if we use .use then it will try to match that path no matter what like /anyword then it will also work
router.get('/', (req, res, next) => {
    res.send('<h1>this is home page</h1>')
})







module.exports = router