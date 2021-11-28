class Employee {
    constructor(obj) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.roleId = obj.roleId;
        this.managerId = obj.managerId;
    }

    updateRole(newRoleId) {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        const params = [newRoleId];
        return { sql, params };
    }
}

module.exports = Employee;