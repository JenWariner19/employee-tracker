const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

function updateEmployee() {

    db.query('SELECT DISTINCT id, title FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            const roleOptions = results.map(role => ({ name: role.title, value: role.id }));

            db.query('SELECT CONCAT(first_name, " " , last_name) AS employee_name FROM employee', (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    const empOptions = results.map(employee => ({ name: employee.employee_name, value: employee.employee_name }));
                    if (empOptions.length === 0) {
                        console.log('No employees found.');
                        return;
                    }
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'employee',
                                message: 'What employee do you want to update?',
                                choices: empOptions,
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: 'What role do you need to change them to?',
                                choices: roleOptions,
                            },
                        ])

                        .then((data) => {
                            console.log(data);
                            const empName = data.employee;
                            const empRole = data.role;

                            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [empRole, empName], (err, results) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('\nEmployee successfully updated!');
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

module.exports = { updateEmployee };