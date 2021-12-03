const inquirer = require('inquirer');
const Query = require('./lib/Query');
const db = require('./db/connection');
const cTable = require('console.table');
const prompts = require('./utils/prompts');

function initializeApp() {
    promptUserForAction();
};

function promptUserForAction() {
    return inquirer
    .prompt(prompts.actions)
    .then(({ action }) => {
        if (action === 'View all departments') {
            return new Query().viewDepartments();
        }
        if (action === 'View all roles') {
            return new Query().viewRoles();
        }
        if (action === 'View all employees') {
            return new Query().viewEmployees();
        }
        if (action === 'Add a department') {
            return inquirer
            .prompt(prompts.newDepartment)
            .then(({ name }) => {
                return new Query().addDepartment(name);
            });
        }
        if (action === 'Add a role') {

        }
        if (action === 'Add an employee') {

        }
        if (action === 'Update an employee role') {

        } 
    }).then(query => {
        if (!query.params) {
            db.promise()
            .query(query.sql)
            .then(response => {
                console.log(``);
                console.table(response[0]);
            })
            .then(() => promptUserToContinue());
        } else {
            db.promise()
            .query(query.sql, query.params)
            .then(() => console.log('Success!'))
            .then(() => promptUserToContinue());
        }
    });
}

function promptUserToContinue() {
    return inquirer
    .prompt(prompts.cont)
    .then(({ cont }) => {
        if (cont === 'EXIT') {
            console.log('Bye!');
            db.end();
        } else {
            promptUserForAction();
        }
    });
}

initializeApp();