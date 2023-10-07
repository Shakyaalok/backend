const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

const forgetPassword = sequelize.define('forget', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
    },
    isactive: {
        type: Sequelize.BOOLEAN,
    },
    expiresby: Sequelize.DATE
})


module.exports = forgetPassword