const expenseModels = require('../models/expenseModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');




const pagination = async(req, res) => {
    const { userId } = req.params
    let page = parseInt(req.query.page) || 1;
    const limit = 2;
    const offset = (page - 1) * limit
    const totalCount = await expenseModels.count({ where: { userId } });
    const totalPages = Math.ceil(totalCount / limit)

    if (page > totalPages) {
        page = totalPages
    }

    if (page < 1) {
        page = 1;
    }

    const expenses = await expenseModels.findAll({
        limit,
        offset,
        where: { userId }
    });

    const nextPage = page < totalPages ? page + 1 : null
    const prevPage = page > 1 ? page - 1 : null
    res.status(201).json({ Expenses: expenses, totalPages, currentPage: page, nextPage, prevPage })
}

module.exports = { pagination }