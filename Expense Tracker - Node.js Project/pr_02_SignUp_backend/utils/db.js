const Sequelize = require('sequelize');
const sequelize = new Sequelize('singup', 'root', 'alokshakya', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize