const expenseModel = require('../models/expenseModels');



const addExpense = async(req, res) => {
    const { productName, productPrice, productCategory, remarks } = req.body;
    const userId = req.user.id;
    if (!productName) {
        return res.status(200).json({ message: 'Product name is required' })
    }
    if (!productPrice) {
        return res.status(200).json({ message: 'Product price is required' })
    }
    if (!productCategory) {
        return res.status(200).json({ message: 'Product category is required' })
    }


    const expense = await expenseModel.create({ productName, productPrice, productCategory, remarks, userId })
    res.status(200).json({
        message: 'Add Successfully!',
        success: true,
        expense
    })
}


const getExpenses = async(req, res) => {
    // const expenses = await expenseModel.findAll({});     it was used previous before middleware
    const expenses = await expenseModel.findAll({ where: { userId: req.user.id } })

    console.log('exxxxxxxxx', expenses)
    res.status(200).json({
        expenses,
        // expense,
        message: 'Your all expense is shown here',

    })



}


const getOneExpense = async(req, res) => {


    const { id } = req.params
    const expense = await expenseModel.findOne({ where: { id } });
    /*


        */
    res.status(200).json({
        expense
    })
}


const deleteExpense = async(req, res) => {
    const { id } = req.params;
    expenseModel.destroy({ where: { id } })
    res.status(200).json({
        success: true
    })
}








module.exports = { addExpense, getExpenses, getOneExpense, deleteExpense }