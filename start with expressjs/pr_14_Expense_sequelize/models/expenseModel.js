const Sequelize = require('sequelize');
const sequelize = require('../utils/db')

const expenseModel = sequelize.define('expense-details', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    productCategory: {
        type: Sequelize.STRING,
        allowNull: false,
    }

})


module.exports = expenseModel;