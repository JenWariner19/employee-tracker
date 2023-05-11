const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What department would you like to add?'
            }
        ])

        .then((data) => {
            const deptInput = data.department;

            db.query('INSERT INTO department (dept_name) VALUES (?)', [deptInput], (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log('\nNew department added successfully!');
                db.query('SELECT * FROM department', (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('\n');
                    console.table(results);
                    console.log('\n');
                });
            });

        });
};

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_title',
                message: 'What role would you like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'input',
                name: 'role_dept',
                message: 'What department does this role belong to? (Please enter 1 for Marketing, 2 for Accounting, 3 for Sales, 4 for Human Resources, 5 for newly added department.)'
            },
        ])

        .then((data) => {
            const roleInput = data.role_title;
            const roleSalary = data.salary;
            const roleDept = data.role_dept;

            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleInput, roleSalary, roleDept], (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log('\nNew role added successfully!');
                db.query('SELECT role.id, role.title, role.salary, department.dept_name AS department_name FROM role JOIN department ON role.department_id = department.id', (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('\n');
                    console.table(results);
                    console.log('\n');
                });
            });

        });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the first last of the employee?'
            },
            {
                type: 'input',
                name: 'role',
                message: 'What postion is this employee assigned to? (Please enter 1 for Email Strategist, 2 for Marketing Director, 3 for Accounts Payable Admin, 4 for Controller, 5 for Sales Associate, 6 for Sales Manager, 7 for Office Manager, 8 for Human Resources Rep, 9 for newly added role.)'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who does this employee report to? (Please enter 1 for Heather Anderson, 4 for Nelson Lee, 6 for Jill West, 10 for Marcus Billings, NULL for none.)'
            },
        ])

        .then((data) => {
            const empFirstName = data.first_name;
            const empLastName = data.last_name;
            const empRole = data.role;
            const empMgr = data.manager;

            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [empFirstName, empLastName, empRole, empMgr], (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log('\nNew employee added successfully!');
                db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.dept_name AS department_name, role.salary as salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id", (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('\n');
                    console.table(results);
                    console.log('\n');
                });
            });

        });
};

module.exports = { addDept, addRole, addEmployee };