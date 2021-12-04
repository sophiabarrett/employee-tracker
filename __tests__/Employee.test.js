const Employee = require('../lib/Employee');

test('should create employee object', () => {
    const inputs = {
        firstName: 'Dennis',
        lastName: 'Cooper',
        role: 6,
        manager: 9
    }
    const employee = new Employee(inputs);

    expect(employee.firstName).toBe('Dennis');
    expect(employee.lastName).toBe('Cooper');
    expect(employee.role).toBe(6);
    expect(employee.manager).toBe(9);
});