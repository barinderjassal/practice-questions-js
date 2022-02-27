/**
 * Given a Date, return an array of arrays representing a calendar view for that month.
 *
 * March 2019:
 * [
 *  [ 24, 25, 26, 27, 28,  1,  2 ],
 *  [  3,  4,  5,  6,  7,  8,  9 ],
 *  [ 10, 11, 12, 13, 14, 15, 16 ],
 *  [ 17, 18, 19, 20, 21, 22, 23 ],
 *  [ 24, 25, 26, 27, 28, 29, 30 ],
 *  [ 31,  1,  2,  3,  4,  5,  6 ]
 * ]
 */
/*
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
 */

/**
 * get the date from the func
 * loop through the given date's month until it changes
 * push all the date(day) in the array by having a counter, as soon as it exceeds 7, create a new array
 *
 * return the days arrays
 */

function getMonth(date) {
  let result = []; // outer array
  let innerArray = []; // inner array
  let month = date.getMonth();
  let weekCount = date.getDay(); // 5

  let positionsToFill = date.getDay();
  let count = 0;
  while (positionsToFill >= 0) {
    positionsToFill--;
    innerArray[positionsToFill] = new Date(
      date.getFullYear(),
      date.getMonth(),
      count
    ).getDate();
    count--;
  }

  while (date.getMonth() === month) {
    if (innerArray.length >= 7) {
      let temp = [...innerArray];
      result.push(temp);
      innerArray.length = 0;
      innerArray.push(new Date(date).getDate());
    } else {
      innerArray.push(new Date(date).getDate());
    }
    // update the date now
    date.setDate(date.getDate() + 1);
  }

  // push the remaining values
  result.push(innerArray);

  // date will be incremented
  while (innerArray.length <= 7) {
    innerArray.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }
  console.log(result);
  console.log(date);
}

getMonth(new Date(2019, 2, 1));
