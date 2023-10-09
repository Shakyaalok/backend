const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, getOneExpense, deleteExpense, downloadExpense, fileDownHistory } = require('../controllers/expenseControllers');
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)
router.get('/download', downloadExpense) // working when it is here(top) but when it is at bottom then not working i dont know the reason
router.get('/download/history/:userId', fileDownHistory)

router.post('/add', addExpense)
router.get('/', getExpenses)
router.get('/:id', getOneExpense)

router.delete('/:id', deleteExpense)













module.exports = router;