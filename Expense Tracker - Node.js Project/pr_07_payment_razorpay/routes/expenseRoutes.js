const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, getOneExpense, deleteExpense } = require('../controllers/expenseControllers');
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)
router.post('/add', addExpense)
router.get('/', getExpenses)
router.get('/:id', getOneExpense)
router.delete('/:id', deleteExpense)











module.exports = router;