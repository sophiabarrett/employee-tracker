const Role = require('../lib/Role');

test('should create role object', () => {
    const inputs = {
        name: 'Software Engineer',
        salary: 120000,
        departmentId: 1
    }
    const role = new Role(inputs);

    expect(role.name).toBe('Software Engineer');
    expect(role.salary).toBe(120000);
    expect(role.departmentId).toBe(1);
});