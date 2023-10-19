const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense_app', 'root', 'alokshakya', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});



module.exports = sequelize;