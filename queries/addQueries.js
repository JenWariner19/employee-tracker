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
    db.query('SELECT DISTINCT id, dept_name FROM department', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            const deptOptions = results.map(department => ({ name: department.dept_name, value: department.id }));
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
                        type: 'list',
                        name: 'role_dept',
                        message: 'What department does this role belong to?',
                        choices: deptOptions,
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
    })
};

function addEmployee() {

    db.query('SELECT DISTINCT id, title FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            const roleOptions = results.map(role => ({ name: role.title, value: role.id }));

            db.query('SELECT e1.id, CONCAT(e1.first_name, " ", e1.last_name) AS manager_name FROM employee e1 JOIN employee e2 ON e1.id = e2.manager_id GROUP BY e1.id', (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    const mgrOptions = results.map(manager => ({ name: manager.manager_name, value: manager.id }));
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
                                type: 'list',
                                name: 'role',
                                message: 'What postion is this employee assigned to?',
                                choices: roleOptions
                            },
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'Who does this employee report to?',
                                choices: mgrOptions
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
                }
            });
        }
    })
};

module.exports = { addDept, addRole, addEmployee };