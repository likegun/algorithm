'use strict';

function exchange(array, i1, i2) {
  const tmp = array[i1];
  array[i1] = array[i2];
  array[i2] = tmp;
}

function getMiddle(array, l, r) {
  let i = l - 1;
  const mValue = array[r];
  for(let j=l;j<r;j++) {
    if(array[j] <= mValue) {
      i += 1;
      exchange(array, i, j);
    }
  }
  exchange(array, i+1, r);
  return i+1;
}

function randomizedSelect(array, l, r, i) {
  if(l===r) return array[l];
  const m = getMiddle(array, l, r);
  const k = m - l + 1;
  if(k===i) return array[m];
  else if(k > i) return randomizedSelect(array, l, m-1, i);
  return randomizedSelect(array, m+1, r, i - k);
}

const array = [4,5,1,2,8,5];
console.log(randomizedSelect(array, 0, array.length - 1, 6));