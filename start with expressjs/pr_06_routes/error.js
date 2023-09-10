const express = require('express')
const router = express.Router();

const ErrorControllers = require('../pr_06_controllers/error')

// console.log(path.join(__dirname))
// use handles all the methods like get,post,...
router.use(ErrorControllers.Error)







module.exports = router;