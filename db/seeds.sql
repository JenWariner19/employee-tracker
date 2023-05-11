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
VALUES ('Heather', 'Anderson', 2, NULL),
       ('Gina', 'Smith', 1, 1),
       ('Tony', 'Finch', 1, 1),
       ('Nelson', 'Lee', 4, NULL),
       ('Karl', 'Clark', 3, 4),
       ('Jill', 'West', 6, NULL),
       ('Lesley', 'Pham', 5, 6),
       ('Josh', 'Kirkland', 5, 6),
       ('Patrick', 'James', 5, 6),
       ('Marcus', 'Billings', 7, NULL),
       ('Sue', 'Velasquez', 8, 10);