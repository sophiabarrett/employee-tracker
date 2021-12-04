const inquirer = require("inquirer");
const db = require("../db/connection");
const Query = require("../lib/Query");

function addRole() {
    let query = new Query().viewDepartments();
    return db.promise()
    .query(query.sql)
    .then(response => {
        const departments = response[0].map(obj => obj.name);
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter a title for the new role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter a salary for the new role:'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Select a department for the new role:',
                choices: departments
            }
        ]);
    }).then(answers => {
        db.promise()
        .query(`SELECT (id) FROM departments WHERE name = ?`, answers.department)
        .then(response => {
            answers.departmentId = response[0][0].id;
            let query = new Query().addRole(answers.title, answers.salary, answers.departmentId);
            db.promise()
            .query(query.sql, query.params)
            .then(() => console.log('Success!'));
        });
    });
}

module.exports = addRole;


