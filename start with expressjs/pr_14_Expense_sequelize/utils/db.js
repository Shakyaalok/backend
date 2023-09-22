const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'alokshakya', {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize;