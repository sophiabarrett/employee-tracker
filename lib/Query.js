const db = require('../db/connection');

class Query {
    viewDepartments() {
        this.sql = `SELECT * FROM departments`;
        return this;
    }

    viewRoles() {
        this.sql = `SELECT roles.id, roles.title AS job_title, roles.salary,
                    departments.name AS department
                    FROM roles
                    LEFT JOIN departments ON roles.department_id = departments.id`;
        return this;
    }

    viewAllEmployees() {
        this.sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    roles.title AS job_title, roles.salary AS salary,
                    departments.name AS department,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employees employee
                    LEFT JOIN roles ON employee.role_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id
                    LEFT JOIN employees manager ON employee.manager_id = manager.id
                    ORDER BY department`;
        return this;
    }

    viewEmployeesByManager(managerId) {
        this.sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    roles.title AS job_title, roles.salary AS salary,
                    departments.name AS department,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employees employee
                    LEFT JOIN roles ON employee.role_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id
                    LEFT JOIN employees manager ON employee.manager_id = manager.id
                    WHERE employee.manager_id = ?`;
        this.params = [ managerId ];
        return this;
    }

    viewEmployeesByDepartment(departmentId) {
        this.sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    roles.title AS job_title, roles.salary AS salary,
                    departments.name AS department,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employees employee
                    LEFT JOIN roles ON employee.role_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id
                    LEFT JOIN employees manager ON employee.manager_id = manager.id
                    WHERE roles.department_id = ?`;
        this.params = [ departmentId ];
        return this;
    }

    addDepartment(department) {
        this.sql = `INSERT INTO departments (name) VALUES (?)`;
        this.params = [ department.name ];
        this.successMessage = `Successfully added ${department.name} as a department!`;
        return this;
    }

    addRole(role) {
        this.sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
        this.params = [ role.title, role.salary, role.department ];
        this.successMessage = `Successfully added ${role.title} to roles!`;
        return this;
    }

    addEmployee(employee) {
        this.sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        this.params = [ employee.firstName, employee.lastName, employee.role, employee.manager ];
        this.successMessage = `Successfully added ${employee.firstName} ${employee.lastName} as an employee!`;
        return this;
    }

    updateEmployeeRole(employee) {
        this.sql = `UPDATE employees SET role_id = ? WHERE employees.id = ?`;
        this.params = [ employee.role, employee.id ];
        this.successMessage = `Successfully updated ${employee.fullName}'s role!`;
        return this;
    }

    updateEmployeeManager(employee) {
        this.sql = `UPDATE employees SET manager_id = ? WHERE employees.id = ?`;
        this.params = [ employee.manager, employee.id ];
        this.successMessage = `Successfully updated ${employee.fullName}'s manager!`;
        return this;
    }

    getDepartmentNamesAsArray() {
        return db.promise()
        .query(`SELECT name FROM departments ORDER BY name`)
        .then(departments => {
            return departments[0].map(obj => obj.name)
        });
    }

    getRoleTitlesAsArray() {
        return db.promise()
        .query(`SELECT title FROM roles ORDER BY title`)
        .then(roles => {
            return roles[0].map(obj => obj.title)
        });
    }

    getEmployeeNamesAsArray() {
        return db.promise()
        .query(`SELECT first_name, last_name FROM employees ORDER BY last_name`)
        .then(employees => {
            return employees[0].map(obj => obj.first_name + ' ' + obj.last_name);
        });
    }

    getDepartmentId(departmentName) {
        return db.promise()
        .query(`SELECT id FROM departments WHERE name = ?`, departmentName)
        .then(data => {
            return data[0][0].id;
        });
    }

    getRoleId(roleTitle) {
        return db.promise()
        .query(`SELECT id FROM roles WHERE title = ?`, roleTitle)
        .then(data => {
            return data[0][0].id;
        });
    }

    getEmployeeId(fullName) {
        const firstName = fullName.split(' ')[0];
        const lastName = fullName.split(' ')[1];
        return db.promise()
        .query(`SELECT id FROM employees WHERE first_name = ? AND last_name = ?`, [firstName, lastName])
        .then(data => {
            return data[0][0].id;
        });
    }
}

module.exports = Query;