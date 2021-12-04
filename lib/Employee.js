class Employee {
    constructor(obj) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.role = obj.role;
        this.manager = obj.manager;
    }
}

module.exports = Employee;