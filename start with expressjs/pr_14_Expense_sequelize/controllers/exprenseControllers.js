const expenseModels = require('../models/expenseModel');
const router = require('../routes/expenseRoutes');


const addExpense = async(req, res) => {

    try {
        const { productName, productPrice, productCategory } = req.body;
        const details = await expenseModels.create({ productName, productPrice, productCategory })
        res.status(201).send({
            message: 'your expense has been added successfully!',
            success: true,
            details
        })


    } catch (error) {
        res.status(500).send({
            message: 'error in adding expense',
            success: false,

        })
    }
}


const deleteOne = async(req, res) => {
    try {
        const { productName } = req.params;
        await expenseModels.destroy({ where: { productName } })
        res.status(200).send({
            message: 'Deleted Successfully!',
            success: true
        })
    } catch (err) {
        res.status(500).send({
            message: ' Deleted NOT Successfully!',
            success: false
        })
    }
}

const getAllDetails = async(req, res) => {
    try {
        const alldetails = await expenseModels.findAll();
        res.status(200).send({
            message: "All Details",
            success: true,
            alldetails
        })
    } catch (error) {
        res.status(500).send({
            message: "error in all details controllers",
            success: false,

        })
    }
}




module.exports = {
    addExpense,
    deleteOne,
    getAllDetails
};