const Sequelize = require('sequelize');
const sequelize = new Sequelize('signup', 'root', 'alokshakya', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize