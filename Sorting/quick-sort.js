function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  // last element of array
  let pivot = array[array.length - 1];
  const leftArr = [];
  const rightArr = [];
  for (let el of array.slice(0, array.length - 1)) {
    if (el < pivot) {
      leftArr.push(el);
    } else {
      rightArr.push(el);
    }
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
}

const arr = [1, 20, 3, 10, 99, 6, 80, 4, 1000, 60, 30, 40];
console.log(quickSort(arr));
