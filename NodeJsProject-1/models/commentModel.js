const Sequelize = require('sequelize');
const sequelize = require('../utils/db')

const comment = sequelize.define('comment', {


    blogComment: {
        type: Sequelize.STRING,
        allowNull: false,
    }

})


module.exports = comment;