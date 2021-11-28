const inquirer = require('inquirer');
const Query = require('../lib/Queries');

const actions = {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
    ]
}


function promptUser() {
    return inquirer
        .prompt(actions)
        .then(({ action }) => {
            if (action === 'View all departments') {
                new Query().viewDepartments();
            }
            if (action === 'View all roles') {

            }
            if (action === 'View all employees') {

            }
            if (action === 'Add a department') {

            }
            if (action === 'Add a role') {

            }
            if (action === 'Add an employee') {

            }
            if (action === 'Update an employee role') {

            }
        });
}

module.exports = promptUser;