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

const exit = {
    type: 'list',
    name: 'exit',
    message: 'Would you like to continue?',
    choices: [
        'Continue',
        'EXIT'
    ]
}

module.exports = {
    actions,
    exit
};