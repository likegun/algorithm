'use strict';
const assert = require('assert');
const MaximumHeap = require('./MaximumHeap');

describe('MaximumHeap', () => {
  it('initial', () => {
    const heap = new MaximumHeap([3,4,2,1,5]);
    assert.deepEqual(heap.getHeap(), [5,4,2,1,3]);
  });

  it('get max value', () => {
    const heap = new MaximumHeap([3,4,2,1,5]);
    assert.equal(heap.max(), 5);
  });

  it('extract value', () => {
    const heap = new MaximumHeap([3,4,2,1,5]);
    assert.equal(heap.extractMax(), 5);
    assert.deepEqual(heap.getHeap(), [4,3,2,1]);
  });
});