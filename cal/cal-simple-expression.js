'use strict';
function cal(n1, operator, n2) {
    switch(operator) {
        case '*':
            return Number(n1) * Number(n2)
        case '/':
            return Number(n1) / Number(n2)
        case '+':
            return Number(n1) + Number(n2)
        case '-':
            return Number(n1) - Number(n2)
        default:
            return 0;
    }
}

function calNoBracketExpression(e) {
    const operators = ['*', '/', '+', '-'];
    for(let operator of operators) {
        const regex = new RegExp(`(\\d+)\\${operator}(\\d+)`);
        let match;

        while((match = e.match(regex)) !== null) {
            const result = cal(match[1], operator, match[2]);
            e = e.replace(match[0], result);
        }
    }
    return e;
}

function calSimpleExpression(e) {
    const regex = /\(([^()]+)\)/;
    let match;

    //去除所有的括号
    while((match = e.match(regex)) !== null) {
        const result = calNoBracketExpression(match[1]);
        e = e.replace(match[0], result);
    }

    return calNoBracketExpression(e);
}

module.exports = calSimpleExpression;