const express = require('express');
const router = express.Router();

const { singUpUser } = require('../controllers/signupControllers')

router.post('/', singUpUser)


module.exports = router