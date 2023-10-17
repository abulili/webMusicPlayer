// database connection
const mysql = require('mysql')
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'musicPlay',
    connectionLimit: 20
})

module.exports = pool
