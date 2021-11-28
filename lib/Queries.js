const db = require('../db/connection');

class Query {
    constructor() {
        this.sql;
        this.params = []
    }

    viewDepartments() {
        this.sql = `SELECT * from departments;`;
        db.promise().query(this.sql, this.params)
        .then(response => {
            console.log(response[0]);
        })
        .then(() => db.end());
    }
}

module.exports = Query;