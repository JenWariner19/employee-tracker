const db = require('../db/connection');


    function allDept() {
        db.query('SELECT * FROM department', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log('\n');
            console.table(results);
            console.log('\n');
        });
    };

    function allRoles() {
        db.query('SELECT * FROM role', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log('\n');
            console.table(results);
            console.log('\n');
        });
    };

    function allEmployees() {
        db.query('SELECT * FROM employee', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log('\n');
            console.table(results);
            console.log('\n');
        });
    };


module.exports = { allDept, allRoles, allEmployees };