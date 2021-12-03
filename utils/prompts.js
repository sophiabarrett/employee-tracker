module.exports = {
    actions: [
        {
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
    ],
    cont: [
        {
            type: 'list',
            name: 'cont',
            message: 'Would you like to continue?',
            choices: [
                'Continue',
                'EXIT'
            ]
        }
    ],
    newDepartment: [
        {
            type: 'input',
            name: 'name',
            message: 'Enter a name for your new department:'
        }
    ]
}