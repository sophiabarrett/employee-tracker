const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker'
    },
    console.log(`Successfully connected to database!
-----------------------------------
`)
);

module.exports = db;