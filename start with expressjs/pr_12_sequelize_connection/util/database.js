const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-schema', 'root', 'alokshakya', {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize;