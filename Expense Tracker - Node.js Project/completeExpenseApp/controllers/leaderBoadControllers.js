const userModels = require('../models/userModels');
const expenseModels = require('../models/expenseModels');



const showleaderBoad = async(req, res) => {
    try {
        const leaderBoard = await userModels.findAll({
            order: [
                ['totalExpenses', 'DESC']
            ],

        });


        res.status(200).json(leaderBoard);
    } catch (error) {

        res.status(500).json({ message: 'Error calculating expenses' });
    }
}














module.exports = { showleaderBoad }