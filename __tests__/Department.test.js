const Department = require('../lib/Department');

test('should create department object', () => {
    const inputs = {
        name: 'Engineering'
    }
    const department = new Department(inputs);

    expect(department.name).toBe('Engineering')
});