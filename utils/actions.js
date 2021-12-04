const db = require('../db/connection');
const cTable = require('console.table');



function viewData(sql) {
    db.promise()
    .query(sql)
    .then(response => {
        console.log(``);
        console.table(response[0]);
    })
    //.then(() => promptUserToContinue());
}

function updateData(query) {
    db.promise()
    .query(query.sql, query.params)
    .then(() => console.log('Success!'))
    .then(() => promptUserToContinue());
}

function viewDepartments() {
    let sql = `SELECT * FROM departments`;
    viewData(sql);
}