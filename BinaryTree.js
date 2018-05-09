'use strict';

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insertToNode(parent, direction, child) {
    if(child.constructor.name !== 'Node') child = new Node(child);
    if(!parent) return this.root = child;
    parent[direction] = child;
    child.parent = parent;
  }

  middleOrderEnumerate(root) {
    if(!root) return [];
    let orders = [];

    orders = [...orders, ...this.middleOrderEnumerate(root.left)];
    orders.push(root.key);
    orders = [...orders, ...this.middleOrderEnumerate(root.right)];
    return orders;
  }

  leftOrderEnumerate(root) {
    if(!root) return [];
    let orders = [];

    orders.push(root.key);
    orders = [...orders, ...this.leftOrderEnumerate(root.left)];
    orders = [...orders, ...this.leftOrderEnumerate(root.right)];
    return orders;
  }

  rightOrderEnumerate(root) {
    if(!root) return [];
    let orders = [];

    orders = [...orders, ...this.rightOrderEnumerate(root.left)];
    orders = [...orders, ...this.rightOrderEnumerate(root.right)];
    orders.push(root.key);
    return orders;
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

module.exports = BinaryTree;