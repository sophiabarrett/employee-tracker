const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

// import inuirer prompts
const {
    actions,
    exit
} = require('../utils/prompts');

// import sql queries
const {
    queryDepartments,
    queryRoles,
    queryEmployees
} = require('../utils/queries');

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
                this.sql = queryDepartments;
                this.viewData();
            }
            if (action === 'View all roles') {
                this.sql = queryRoles;
                this.viewData();
            }
            if (action === 'View all employees') {
                this.sql = queryEmployees;
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