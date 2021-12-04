const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
const Query = require('./lib/Query');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

function promptUserToContinue() {
    return inquirer
    .prompt({
        type: 'list',
        name: 'nextStep',
        message: 'Would you like to continue?',
        choices: [
            'Continue',
            'EXIT'
        ]
    })
    .then(({ nextStep }) => {
        if (nextStep === 'EXIT') {
            console.log('Bye!');
            db.end();
        } else {
            promptUserForAction();
        }
    });
}

function viewData(query) {
    db.promise()
    .query(query.sql)
    .then(response => {
        console.log(``);
        console.table(response[0]);
    })
    .then(() => promptUserToContinue());
}

function updateData(query) {
    db.promise()
    .query(query.sql, query.params)
    .then(() => console.log('Success!'))
    .then(() => promptUserToContinue());
}

function viewDepartments() {
    const query = new Query().viewDepartments();
    viewData(query);
}

function viewRoles() {
    const query = new Query().viewRoles();
    viewData(query);
}

function viewEmployees() {
    const query = new Query().viewEmployees();
    viewData(query);
}

async function addDepartment() {
    const department = new Department(await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter a name for the new department:'
        }
    ]));
    const query = new Query().addDepartment(department);
    updateData(query);
}

async function addRole() {
    const departmentsArr = await new Query().getDepartmentNamesAsArray();
    const role = new Role(await inquirer.prompt([
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
            choices: departmentsArr
        }
    ]));
    // update department to id instead of name
    role.department = await new Query().getDepartmentId(role.department);
    const query = new Query().addRole(role.title, role.salary, role.department);
    updateData(query);
}

async function addEmployee() {
    const rolesArr = await new Query().getRoleTitlesAsArray();
    const employeesArr = await new Query().getEmployeeNamesAsArray();
    const employee = new Employee(await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the new employee\'s first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the new employee\'s last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the new employee\'s role?',
            choices: rolesArr
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the new employee\'s manager?',
            choices: employeesArr
        }
    ]));
    employee.role = await new Query().getRoleId(employee.role);
    employee.manager = await new Query().getEmployeeId(employee.manager);
    const query = new Query().addEmployee();
}

async function promptUserForAction() {
    const { action } = await inquirer.prompt({
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
    });
    if (action === 'View all departments') { viewDepartments() }
    if (action === 'View all roles') { viewRoles() }
    if (action === 'View all employees') { viewEmployees() }
    if (action === 'Add a department') { addDepartment() }
    if (action === 'Add a role') { addRole() }
    if (action === 'Add an employee') { addEmployee() }
    if (action === 'Update an employee') { updateEmployee() }
};

function initializeApp() {
    promptUserForAction();
};

// function promptUserForAction() {
//     return inquirer
//     .prompt({
//         type: 'list',
//         name: 'action',
//         message: 'What would you like to do?',
//         choices: [
//             'View all departments',
//             'View all roles',
//             'View all employees',
//             'Add a department',
//             'Add a role',
//             'Add an employee',
//             'Update an employee role'
//         ]
//     })
//     .then(({ action }) => {
//         if (action === 'View all departments') {
//             return new Query().viewDepartments();
//         }
//         if (action === 'View all roles') {
//             return new Query().viewRoles();
//         }
//         if (action === 'View all employees') {
//             return new Query().viewEmployees();
//         }
//         if (action === 'Add a department') {
//             return inquirer
//             .prompt({
//                 type: 'input',
//                 name: 'name',
//                 message: 'Enter a name for the new department:'
//             })
//             .then(({ name }) => {
//                 return new Query().addDepartment(name);
//             });
//         }
//         if (action === 'Add a role') {
//             //addRole();
//         }
//         if (action === 'Add an employee') {

//         }
//         if (action === 'Update an employee role') {

//         } 
//     }).then(query => {
//         if (!query.params) {
//             db.promise()
//             .query(query.sql)
//             .then(response => {
//                 console.log(``);
//                 console.table(response[0]);
//             })
//             .then(() => promptUserToContinue());
//         } else {
//             db.promise()
//             .query(query.sql, query.params)
//             .then(() => console.log('Success!'))
//             .then(() => promptUserToContinue());
//         }
//     });
// }

initializeApp();