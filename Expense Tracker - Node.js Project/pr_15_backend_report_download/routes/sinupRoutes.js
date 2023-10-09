const express = require('express');
const router = express.Router();

const { singUpUser, login } = require('../controllers/signupControllers')

router.post('/', singUpUser)
router.post('/login', login)


module.exports = router