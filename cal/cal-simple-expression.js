'use strict';
const BinaryTree = require('../BinaryTree');

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

function calSimpleExpression(e) {
    const tree = new BinaryTree();
    tree.insertToNode(null, null, e);
    removeOneOperator(tree, tree.root);
    console.log(tree.leftOrderEnumerate(tree.root));
    console.log(tree.middleOrderEnumerate(tree.root));
    console.log(tree.rightOrderEnumerate(tree.root));
}

calSimpleExpression('2*(6-4)+5');

module.exports = calSimpleExpression;