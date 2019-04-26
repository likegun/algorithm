'use strict';

function minMaxSelect(array) {
  let min,max;
  if(array.length === 0) return {min,max};
  if(array % 2 === 1) min = max = array[0];
  else {
    [min, max] = array[0] < array[1] ? [array[0], array[1]] : [array[1], array[0]];
  }
  for(let i = array % 2 === 1 ? 1 : 2; i < array.length; i+=2) {
    const [min1, max1] = array[i] < array[i+1] ? [array[i], array[i+1]] : [array[i+1], array[i]];
    min = min < min1 ? min : min1;
    if(max1 !== undefined) max = max > max1 ? max : max1;
  }
  return {min, max};
}

const array = [4,5,1,2,8,5];
console.log(minMaxSelect(array));
