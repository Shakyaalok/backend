const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking', 'root', 'alokshakya', {
    dialect: 'mysql',
    host: 'localhost'
})


module.exports = sequelize;


// schemas in db must be in lower case


// for coonection in seuelize this file in db.js and some 2 line in mid and in the last in app.js are for only the database connections only