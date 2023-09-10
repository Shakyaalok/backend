const express = require('express')
const router = express.Router();
const path = require('path')


exports.getcontact = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'contact.html'))
}