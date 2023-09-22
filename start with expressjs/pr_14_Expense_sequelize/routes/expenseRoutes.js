const express = require('express');
const router = express.Router();

const { addExpense, deleteOne, getAllDetails } = require('../controllers/exprenseControllers')


router.post('/add-expense', addExpense);
router.delete('/delete/:productName', deleteOne)
router.get('/alldetails', getAllDetails)


module.exports = router