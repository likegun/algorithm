'use strict';

function exchange(array, i1, i2) {
  const tmp = array[i1];
  array[i1] = array[i2];
  array[i2] = tmp;
}

function getMiddle(array, l, r) {
  let i = l - 1;
  const mValue = array[r];
  for(let j=l; j < r; j++) {
    if(array[j] <= mValue) {
      i++;
      exchange(array, i, j);
    }
  }
  exchange(array, i + 1, r);
  return i + 1;
}

function quickSort(array, l, r) {
  if(l >= r) return;
  const m = getMiddle(array, l, r);
  quickSort(array, l, m - 1);
  quickSort(array, m + 1, r);
}

const array = [4,6,2,1,7,8,2];
quickSort(array, 0, array.length - 1);
console.log(array);