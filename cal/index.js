'use strict'
const inquirer = require('inquirer');
const cal = require('./cal-simple-expression');

function ask() {
    inquirer.prompt([{
        type: 'input',
        name: 'q',
        message: '输入涉及加减乘除的表达式'
    }])
    .then(answers => {
        console.log(`${answers.q}:${cal(answers.q)}`);
        ask();
    })
    .catch(err => {
        console.error(err);
        ask();
    })
}

ask();