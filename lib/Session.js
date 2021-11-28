const inquirer = require('inquirer');
const { actions, exit } = require('../utils/prompts');
const db = require('../db/connection');
const cTable = require('console.table');

class Session {
    constructor() {
        this.sql;
        this.params = []
    }

    initializeApp() {
        this.promptUserForAction();
    }

    promptUserForAction() {
        return inquirer
        .prompt(actions)
        .then(({ action }) => {
            if (action === 'View all departments') {
                this.sql = `SELECT * from departments`;
                this.viewData();
            }
            if (action === 'View all roles') {
                this.sql = `SELECT roles.id, roles.title AS role, roles.salary,
                            departments.name AS department
                            FROM roles
                            LEFT JOIN departments ON roles.department_id = departments.id`;
                this.viewData();
            }
            if (action === 'View all employees') {
                this.sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    roles.title AS role, roles.salary AS salary,
                    departments.name AS department,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employees employee
                    LEFT JOIN roles ON employee.role_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id
                    LEFT JOIN employees manager ON employee.manager_id = manager.id`;
                this.viewData();
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

    promptUserToContinue() {
        return inquirer
        .prompt(exit)
        .then(({ exit }) => {
            if (exit === 'EXIT') {
                console.log('Bye!');
                db.end();
            } else {
                this.promptUserForAction();
            }
        });
    }

    viewData() {
        db.promise()
        .query(this.sql)
        .then(response => {
            console.log(``)
            console.table(response[0]);
        })
        .then(() => this.promptUserToContinue());
    }
}

module.exports = Session;