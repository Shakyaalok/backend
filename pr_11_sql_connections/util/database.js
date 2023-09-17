const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-schema',
    password: 'alokshakya'
})


module.exports = pool.promise();