'use strict';
const BinaryTree = require('../BinaryTree');
let map;

function getFisrtOperatorIndexNotInBracket(operator, str) {
    const cs = [];
    for(let [i, c] of Array.from(str).entries()) {
        switch(c) {
            case '(':
                cs.push('(');
                break;
            case ')':
                cs.pop();
                break;
            case operator:
                if(!cs.length) return i;
                break;
        }
    }
}

function removeOneOperator(tree, node) {
    let index;

    for(let o of ['+', '-', '*', '/']) {
        index = getFisrtOperatorIndexNotInBracket(o, node.key);
        if(index != null) break;
    }

    if(index == null) return;
    tree.insertToNode(node, 'left', node.key.slice(0, index).replace(/^\((.*)\)$/, '$1'));
    tree.insertToNode(node, 'right', node.key.slice(index + 1).replace(/^\((.*)\)$/, '$1'));
    node.key = node.key[index];
    removeOneOperator(tree, node.left);
    removeOneOperator(tree, node.right);
}

function cal(n1, o, n2) {
    switch (o) {
        case '+':
            return Number(n1) + Number(n2);
        case '-':
            return Number(n1) - Number(n2);
        case '*':
            return Number(n1) * Number(n2);
        case '/':
            return Number(n1) / Number(n2);
        default:
            throw new Error(`不支持的操作符:${o}`);
    }
}

function calculateExpression(tree) {
    const stack = [];
    const operators = ['+', '-', '*', '/'];
    for(let e of tree.rightOrderEnumerate(tree.root)) {
        if(operators.includes(e)) {
            const n2 = stack.pop();
            const n1 = stack.pop();
            stack.push(cal(typeof n1 == 'number' ? n1: map[n1], e, typeof n2 == 'number' ? n2: map[n2]))
        } else {
            stack.push(e);
        }
    }
    return Number(stack.pop());
}

function getRandomName(length) {
    let name = '';
    while(length--) {
        name += String.fromCodePoint(97 + Math.ceil(Math.random() * 25));
    }
    return name;
}

function splitNumber(e) {
    let s = [];
    let stack = [];
    const map = {};
    const operators = ['+', '-', '*', '/'];

    for(let c of e) {
        if(c.match(/\d/) || ( c == '-' && stack.length === 0 )) {
            stack.push(c);
            continue;
        }

        if(!operators.includes(c) && c !== ')') {
            s.push(c);
            continue;
        }

        if(stack.length === 0) {
            s.push(c);
            continue;
        }

        const name = getRandomName(4);
        s.push(name);
        s.push(c);
        map[name] = Number(stack.join(''));
        stack = [];
    }

    if(stack.length > 0) {
        const name = getRandomName(4);
        s.push(name);
        map[name] = Number(stack.join(''));
        stack = [];
    }
    return {
        s,
        map
    };
}

function calSimpleExpression(e) {
    const ret = splitNumber(e);
    map = ret.map;
    e = ret.s.join('');
    console.log(e);
    console.log(map)
    const tree = new BinaryTree();
    tree.insertToNode(null, null, e);
    removeOneOperator(tree, tree.root);
    console.log(tree.rightOrderEnumerate(tree.root))
    console.log(calculateExpression(tree))
}

calSimpleExpression('-2*(-6-4)+5');
module.exports = calSimpleExpression;