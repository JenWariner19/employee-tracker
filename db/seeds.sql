INSERT INTO department (dept_name)
VALUES ('Marketing'),
       ('Accounting'),
       ('Sales'),
       ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Email Strategist', 55000, 1),
       ('Marketing Director', 110000, 1),
       ('Accounts Payable Admin', 50000, 2),
       ('Controller', 85000, 2),
       ('Sales Associate', 40000, 3),
       ('Sales Manager', 70000, 3),
       ('Office Manager', 52000, 4),
       ('Human Resources Rep', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gina', 'Smith', 1, NULL),
       ('Tony', 'Finch', 1, NULL),
       ('Heather', 'Anderson', 2, 1),
       ('Karl', 'Clark', 3, NULL),
       ('Nelson', 'Lee', 4, 2),
       ('Lesley', 'Pham', 5, NULL),
       ('Josh', 'Kirkland', 5, NULL),
       ('Patrick', 'James', 5, NULL),
       ('Jill', 'West', 6, 3),
       ('Marcus', 'Billings', 7, 4),
       ('Sue', 'Velasquez', 8, NULL);