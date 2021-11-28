const Employee = require('../lib/Employee');

test('should create employee object', () => {
    const inputs = {
        firstName: 'Dennis',
        lastName: 'Cooper',
        roleId: 6,
        managerId: 9
    }
    const employee = new Employee(inputs);

    expect(employee.firstName).toBe('Dennis');
    expect(employee.lastName).toBe('Cooper');
    expect(employee.roleId).toBe(6);
    expect(employee.managerId).toBe(9);
});

test('should update employee role', () => {
    const inputs = {
        firstName: 'Dennis',
        lastName: 'Cooper',
        roleId: 6,
        managerId: 9
    }
    const employee = new Employee(inputs);

    expect(employee.updateRole(5).sql).toMatch(`UPDATE employees SET role_id = ? WHERE id = ?`);
    expect(employee.updateRole(5).params).toContain(5);
});