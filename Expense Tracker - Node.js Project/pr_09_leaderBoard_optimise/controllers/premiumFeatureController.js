const signupModel = require('../models/signupModel')
const expenseModel = require('../models/expenseModels')
const sequelize = require('../utils/db');
const { Model } = require('sequelize');



const premiumFeauter = async(req, res) => {
    try {
        const leaderBoard = await signupModel.findAll({
            // attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.productPrice')), 'totalExpenses']], it works but when the totalExpenses is null show we want to show so we use the below code
            attributes: ['id', 'name', [sequelize.fn('COALESCE', sequelize.fn('sum', sequelize.col('expenses.productPrice')), 0), 'totalExpenses']],
            include: [{
                model: expenseModel,
                attributes: []
            }],

            group: ['user.id'],
            order: [
                ['totalExpenses', 'DESC']
            ]
        });


        res.status(200).json(leaderBoard);
    } catch (error) {
        console.log('Error in calculating the expenses', error)
    }


}


module.exports = { premiumFeauter };