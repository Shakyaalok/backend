const Sequelize = require('sequelize');
const sequelize = require('../util/db');


const Detail = sequelize.define('detail', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    mobile: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }


})


module.exports = Detail;