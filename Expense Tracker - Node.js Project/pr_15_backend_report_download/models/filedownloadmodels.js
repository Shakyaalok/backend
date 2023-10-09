const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

const fileDownload = sequelize.define('filedown', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    fileUrl: {
        type: Sequelize.STRING,
    },

})


module.exports = fileDownload