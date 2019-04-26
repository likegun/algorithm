'use strict';

function countingSort(array) {
  const countingArray = [];
  const sortedArray = [];
  for(const v of array) {
    countingArray[v] = countingArray[v] ? countingArray[v] + 1 : 1;
  }
  for(let i=1;i<countingArray.length;i++) {
    countingArray[i] = countingArray[i] ? countingArray[i] : 0;
    countingArray[i] += countingArray[i-1] ? countingArray[i-1] : 0;
  }
  for(const v of array) {
    countingArray[v] --;
    sortedArray[countingArray[v]] = v;
  }
  return sortedArray;
}

const array = [4,6,2,1,7,8,2];

console.log(countingSort(array));