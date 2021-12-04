const Role = require('../lib/Role');

test('should create role object', () => {
    const inputs = {
        title: 'Software Engineer',
        salary: 120000,
        department: 1
    }
    const role = new Role(inputs);

    expect(role.title).toBe('Software Engineer');
    expect(role.salary).toBe(120000);
    expect(role.department).toBe(1);
});