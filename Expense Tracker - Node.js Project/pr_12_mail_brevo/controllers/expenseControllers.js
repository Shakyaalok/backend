const expenseModel = require('../models/expenseModels');
const singupModel = require('../models/signupModel');
const sequelize = require('../utils/db')



const addExpense = async(req, res) => {
    const t = await sequelize.transaction();
    try {
        const { productName, productPrice, productCategory, remarks } = req.body;
        const userId = req.user.id;
        if (!productName) {
            await t.rollback();
            return res.status(200).json({ message: 'Product name is required' })
        }
        if (!productPrice) {
            await t.rollback();
            return res.status(200).json({ message: 'Product price is required' })
        }
        if (!productCategory) {
            await t.rollback();
            return res.status(200).json({ message: 'Product category is required' })
        }



        const expense = await expenseModel.create({
            productName,
            productPrice,
            productCategory,
            remarks,
            userId,
        }, { transaction: t })




        const totalExpense = Number(req.user.totalExpenses) + Number(productPrice);
        console.log(totalExpense);


        await singupModel.update({ totalExpenses: totalExpense }, {
            where: { id: req.user.id },
            transaction: t
        })

        await t.commit()

        res.status(200).json({ expense: expense, message: 'add successfully!' })

    } catch (error) {
        await t.rollback();

        return res.status(500).json({
            success: false,
            message: 'Error in creating the user expenses',
            error,
        });
    }
}




const getExpenses = async(req, res) => {
    try {
        const expenses = await expenseModel.findAll({
            where: { userId: req.user.id },

        })

        return res.status(200).json({
            expenses,
            message: 'Your expenses have been retrieved successfully',
        });


    } catch (error) {
        return res.status(500).json({
            expenses,
            message: 'error in showring the expenses',

        })
    }
}


const getOneExpense = async(req, res) => {
    const { id } = req.params

    try {
        const expense = await expenseModel.findOne({ where: { id } });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found!' })
        }

        res.status(200).json({ expense })

    } catch (error) {
        return res.status(500).json({ message: 'Error in getting the one expenses' })
    }

}


const deleteExpense = async(req, res) => {
    const t = await sequelize.transaction();
    const { id } = req.params;
    let amount = 0;
    try {
        const currentProductExpense = await expenseModel.findOne({ where: { id: id } }, { transaction: t })
        const user = await singupModel.findOne({ where: { id: req.user.id } })
        amount = user.totalExpenses - currentProductExpense.productPrice

        await currentProductExpense.destroy({ where: { id: id } }, { transaction: t })
            // now update 
        await user.update({ totalExpenses: amount })


        // console.log('Current product PRICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', amount)
        await t.commit();
        res.status(200).json({ success: true, message: 'Deleted!' })
    } catch (error) {
        await t.rollback();
        return res.status(500).json({ message: 'error in deletion the expense', error })
    }
}








module.exports = { addExpense, getExpenses, getOneExpense, deleteExpense }