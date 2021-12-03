class Query {
    viewDepartments() {
        this.sql = `SELECT * from departments`;
        return this;
    }

    viewRoles() {
        this.sql = `SELECT roles.id, roles.title AS role, roles.salary,
                    departments.name AS department
                    FROM roles
                    LEFT JOIN departments ON roles.department_id = departments.id`;
        return this;
    }

    viewEmployees() {
        this.sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    roles.title AS role, roles.salary AS salary,
                    departments.name AS department,
                    CONCAT(manager.first_name, " ", manager.last_name) AS manager
                    FROM employees employee
                    LEFT JOIN roles ON employee.role_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id
                    LEFT JOIN employees manager ON employee.manager_id = manager.id`;
        return this;
    }

    addDepartment(name) {
        this.sql = `INSERT INTO departments (name) VALUES (?)`;
        this.params = [ name ];
        return this;
    }
}

module.exports = Query;