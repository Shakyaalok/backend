const path = require('path')
exports.Error = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'pr_05_views', 'error.html'))
}