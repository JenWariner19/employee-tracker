const inquirer = require('inquirer');
const { allDept, allRoles, allEmployees } = require('./queries/viewQueries');
const { addDept, addRole, addEmployee } = require('./queries/addQueries');
const { updateEmployee } = require('./queries/updateQuery');


function promptUser() {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],

    }
]) 

    .then((response) => {
        switch (response.choices) {
            case 'View All Departments':
                allDept();
                break;

            case 'View All Roles':
                allRoles();
                break;

            case 'View All Employees':
                allEmployees();
                break;

            case 'Add a Department':
                addDept();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Update an Employee Role':
                updateEmployee();
                break;

            default:
                console.log('Invalid Selection');
        }
        // setTimeout(() => {
        //     promptUser();
        // }, 500);
        

    })
.catch(err => {
    console.error(err);
});
}

promptUser();