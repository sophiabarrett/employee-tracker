DELETE FROM roles;
DELETE FROM departments;

INSERT INTO departments (name)
VALUES
    ('Engineering'),
    ('Marketing'),
    ('Sales'),
    ('Finance'),
    ('Legal'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Marketing Manager', 95000, 2),
    ('Marketing Specialist', 75000, 2),
    ('Sales Manager', 100000, 3),
    ('Salesperson', 80000, 3),
    ('Account Manager', 160000, 4),
    ('Accountant', 120000, 4),
    ('Legal Team Lead', 230000, 5),
    ('Lawyer', 180000, 5),
    ('HR Director', 85000, 6),
    ('HR Representative', 65000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Fraser', 1, NULL),
    ('Jack', 'London', 2, 1),
    ('Robert', 'Bruce', 2, 1),
    ('Peter', 'Greenaway', 2, 1),
    ('Derek', 'Jarman', 2, 1),
    ('Paolo', 'Pasolini', 3, NULL),
    ('Heathcote', 'Williams', 4, 6),
    ('Sandy', 'Powell', 4, 6),
    ('Emil', 'Zola', 4, 6),
    ('Sissy', 'Coalpits', 5, NULL),
    ('Antoinette', 'Capet', 6, 9),
    ('Samuel', 'Delany', 6, 9),
    ('Tony', 'Duvert', 6, 9),
    ('Dennis', 'Cooper', 6, 9),
    ('Monica', 'Bellucci', 7, NULL),
    ('Samuel', 'Johnson', 8, 16),
    ('John', 'Dryden', 8, 16),
    ('Alexander', 'Pope', 9, NULL),
    ('Lionel', 'Johnson', 10, 19),
    ('Aubrey', 'Beardsley', 10, 19);