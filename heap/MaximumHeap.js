'use strict';

class MaximumHeap {
  constructor(heap) {
    this.heap = [null, ...heap];
    for(let i = Math.floor(this.size() / 2); i >= 1; i--) this.maxHeapify(i);
  }

  maxHeapify(i) {
    const left = this.left(i);
    const right = this.right(i);
    let largest = i;
    if(left <= this.size() && this.heap[left] > this.heap[largest]) largest = left;
    if(right <= this.size() && this.heap[right] > this.heap[largest]) largest = right;
    if(largest === i) return;
    this.exchange(i, largest);
    this.maxHeapify(largest);
  }

  exchange(n1, n2) {
    const tmp = this.heap[n1];
    this.heap[n1] = this.heap[n2];
    this.heap[n2] = tmp;
  }

  extractMax() {
    if(this.size() === 0) return null;
    const max = this.heap[1];
    this.heap[1] = this.heap[this.size()];
    this.heap.pop();
    this.maxHeapify(1);
    return max;
  }

  getHeap() {
    return this.heap.slice(1);
  }

  max() {
    if(this.size() === 0) return null;
    return this.heap[1];
  }

  size() {
    return this.heap.length - 1;
  }

  parent(i) {
    return Math.floor(i/2);
  }

  left(i) {
    return i*2;
  }

  right(i) {
    return i*2 + 1;
  }
}

module.exports = MaximumHeap;