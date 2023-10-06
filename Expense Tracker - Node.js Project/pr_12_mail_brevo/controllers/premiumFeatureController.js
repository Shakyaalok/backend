const signupModel = require('../models/signupModel')
const expenseModel = require('../models/expenseModels')
const sequelize = require('../utils/db');




const premiumFeauter = async(req, res) => {
    const t = await sequelize.transaction();
    try {
        const leaderBoard = await signupModel.findAll({
            order: [
                ['totalExpenses', 'DESC']
            ],
            transaction: t
        });

        await t.commit();
        res.status(200).json(leaderBoard);
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error calculating expenses' });
    }


}


module.exports = { premiumFeauter };