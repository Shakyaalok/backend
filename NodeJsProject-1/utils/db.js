const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog-schema', 'root', 'alokshakya', {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize;