const path = require('path')

exports.successC = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'success.html'))
}