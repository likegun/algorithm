'use strict';

class SortBinaryTree {
  constructor() {
    this.root = null;
  }

  insert(key) {
    const newNode = new Node(key);

    if(!this.root) return this.root = newNode;
    this.insertToNode(this.root, newNode);
  }

  insertToNode(parent, child) {
    if(parent.key > child.key) {
      if(parent.left) return this.insertToNode(parent.left, child);
      parent.left = child;
    }
    else {
      if(parent.right) return this.insertToNode(parent.right, child);
      parent.right = child;
    }
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

  searchNode(node, key) {
    if(!node) return null;
    if(key === node.key) return node;
    return node.key > key? this.searchNode(node.left, key) : this.searchNode(node.right, key);
  }

  getMaxNode(node) {
    if(!node) return null;

    return node.right? this.getMaxNode(node.right) : node;
  }

  getMinNode(node) {
    if(!node) return null;

    return node.left? this.getMinNode(node.left) : node;
  }

  delNode(key) {
    const node = this.searchNode(this.root, key);
    if(!node) return;

    if(node.left && node.right) {
      const minNode = this.getMinNode(node.right);

      node.key = minNode.key;
      const leftOrRight = minNode.parent.left === minNode ? 'left' : 'right';
      if(minNode.right) {
        this.setChild(minNode.parent, leftOrRight, minNode.right);
      } else {
        this.setChild(minNode.parent, leftOrRight, null);
      }
    }
    else if(node.left) {
      node.key = node.left.key;
      this.setChild(node, 'left', node.left.left);
      this.setChild(node, 'right', node.left.right);
    }
    else if(node.right) {
      node.key = node.right.key;
      this.setChild(node, 'left', node.right.left);
      this.setChild(node, 'right', node.right.right);
    }
    else {
      if(node === this.root) this.root = null;
      else if(node.parent.left === node) this.setChild(node.parent, 'left', null);
      else this.setChild(node.parent, 'right', null);
    }
  }

  setChild(parent, direction, child) {
    parent[direction] = child;
    if(child) child.parent = parent;
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

module.exports = SortBinaryTree;

// const bTree = new SortBinaryTree();
// for(let key of [1, -1, 3, 54 , 2, 7, 8 ,100]) {
//   bTree.insert(key);
// }
// console.log(bTree.middleOrderEnumerate(bTree.root));
// console.log(bTree.leftOrderEnumerate(bTree.root));
// console.log(bTree.rightOrderEnumerate(bTree.root));
// console.log(bTree.searchNode(bTree.root, 3));
// console.log(bTree.getMaxNode(bTree.root));
// console.log(bTree.getMinNode(bTree.root));
// bTree.delNode(3);
// console.log(bTree.middleOrderEnumerate(bTree.root));
// bTree.delNode(8);
// console.log(bTree.middleOrderEnumerate(bTree.root));
