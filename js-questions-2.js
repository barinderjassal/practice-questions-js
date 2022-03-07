var input = {
  a: {
    d: {},
    b: {
      c: [],
    },
  },
  e: 'e',
  f: null,
  g: -2,
};
/**
 * This is incomplete
 */
// expected output for above input, should be an array with all these keys in any order
var output = ['g', 'f', 'e', 'a.b.c', 'a.d'];

const getKeys = (obj, keyValue = '') => {
  let result = [];

  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keyValue = keyValue ? keyValue + key + '.' : key + '.'; //a.b.
      getKeys(obj[key], keyValue);
    } else {
      keyValue = key;
      result.push(keyValue);
    }
  }
  return result;
};

getKeys(input);

[1, 2, 3, 4, 5, 16, 29, 40];
3; //
8; // at what index will it be inserted to keep it sorted

/**
 * Remove duplicate objects from array of objects
 */
var input = [
  { make: 'AUDI', model: 'R8' },
  { make: 'TATA', model: 'aria' },
  { make: 'Maruti', model: '800' },
  { make: 'Maruti', model: 'wagnor' },
  { make: 'AUDI', model: 'R8' },
  { make: 'AUDI', model: 'R7' },
];

output = [
  { make: 'AUDI', model: 'R8' },
  { make: 'TATA', model: 'aria' },
  { make: 'Maruti', model: '800' },
];

const unique = input.reduce((accumulator, current) => {
  if (!accumulator.some((item) => item.make === current.make)) {
    accumulator.push(current);
  }
  return accumulator;
}, []);

/**
 * Objects as keys
 */

var a = {},
  b = { key: 'b' },
  c = { key: 'c' };
(a[b] = 123), (a[c] = 456);
console.log(a);

/**
 * All JavaScript object keys are strings. Even if you pass an object as a key,
 * the object's toString() will be called on it, and the key will be stringified to [object Object].
 * So in short, you cant have objects as keys in JS
 */

/////////////////////////////////

var arr1 = 'Java'.split('');
var arr2 = arr1.reverse();
var arr3 = 'John'.split('');
arr2.push(arr3);
console.log(arr1.length + arr1.slice(-1).length);
console.log(arr1.length + arr2.slice(-1));

/////////////////////////////////

function test() {
  console.log('1');

  new Promise((resolve) => {
    return resolve('2');
  }).then((val) => console.log(val));

  console.log('3');

  new Promise((resolve) => {
    return resolve(setTimeout(() => console.log('4'), 2000));
  });
  setTimeout(() => console.log('5'), 0);
  console.log('6');
}

/*
  1. Implement ES6 into the 'john' {}
  2. Return value from the 'deduct' () after 2s
*/

var john = {
  name: 'John Doe',
  balance: 1500,
  deduct: function (amount) {
    this.balance = this.balance - amount;
    return this.name + ' has a balance of ' + this.balance;
  },
};

document.body.innerText = john.deduct(200);

// Solution

const john = {
  name: 'John Doe',
  balance: 1500,
  deduct(amount) {
    this.balance -= amount;

    return new Promise((resolve) => {
      setTimeout(() => {
        const str = `${this.name} has a balance of ${this.balance}`;
        resolve(str);
      }, 3000);
    });
  },
};

john.deduct(200).then((res) => {
  document.body.innerText = res;
});

/**
 * Polyfill for allSettled
 */

Promise.allSettled = function (promises) {
  let mappedPromises = promises.map((p) => {
    return p
      .then((value) => {
        return {
          status: 'fulfilled',
          value,
        };
      })
      .catch((reason) => {
        return {
          status: 'rejected',
          reason,
        };
      });
  });
  return Promise.all(mappedPromises);
};

/**
 *
 * Promise.all Polyfill
 *
 */
function promiseAll(promisesArray) {
  let resultantPromise = [];
  let resolvedromises = 0;
  return new Promise((resolve, reject) => {
    promisesArray.forEach((prom, index) => {
      prom
        .then((response) => {
          resultantPromise[index] = response; //[1,2,3,4]
          resolvedromises++;
          //counter
          if (resolvedromises === promisesArray.length) {
            resolve(resultantPromise);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
promiseAll([
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3),
  Promise.resolve(4),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * if a given key is present in the object or not
 */
function findPropPath(obj, propertyToFind) {
  for (var prop in obj) {
    if (prop == propertyToFind) {
      return propertyToFind;
    } else if (typeof obj[prop] == 'object') {
      var result = findPropPath(obj[prop], propertyToFind);
      console.log(result);
      if (result) {
        return prop + '.' + result;
      }
    }
  }
  return null; // Not strictly needed, but good style
}

var myObj = {
  a: {
    b: {
      c: {
        x: 1,
        y: 2,
      },
    },
  },
};
console.log(findPropPath(myObj, 'name'));

/**
 *
 * Group Anagrams in a given string array
 *
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 *
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 */
function groupAnagrams(strArr) {
  let hash = {};

  for (let word of strArr) {
    const hashKey = [...word].sort().join('');
    (hash[hashKey] = hash[hashKey] || []).push(word);
  }
  return Object.values(hash);
}
groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);

/**
 * Build Function Chaining
 */
function Calculator(initialVal) {
  this.result = initialVal;
  this.add = function (addValue) {
    this.result += addValue;
    return this;
  };

  this.multiply = function (multiplyValue) {
    this.result *= multiplyValue;
    return this;
  };

  this.done = function () {
    return this.result;
  };
}

function main() {
  const x = new Calculator(10);

  if (x.add(3).multiply(2).add(4).done() === 30) {
    console.log('true');
  } else {
    console.log('false');
  }
}
main();

/**
 * multiple closures
 */
function calculate() {
  let counter = 0;

  function increment() {
    counter++;
  }

  const message = `Count is ${counter}`;

  function print() {
    console.log(message);
  }

  return [increment, print];
}

let [increment, print] = calculate();

increment(); // 1
increment(); // 2
increment(); // 3
print(); //

/**
 * 
 * You're given a two-dimensional array (a matrix) of distinct integers and a
   target integer. Each row in the matrix is sorted, and each column is also sorted; the
   matrix doesn't necessarily have the same height and width.

  Write a function that returns an array of the row and column indices of the
  target integer if it's contained in the matrix, otherwise [-1,-1]

  const input = [
    [1, 4, 7, 12, 15, 1000], // 0
    [2, 5, 19, 31, 32, 1001], // 1
    [3, 8, 24, 33, 35, 1002], // 2
    [40, 41, 42, 44, 45, 1003], // 3
    [99, 100, 103, 106, 128, 1004],
  ] 
  
  const target = 99;
 */

function getRowColumnIndex(input, target) {
  let i = 0;
  let j = input[i].length - 1;
  
  while (i < input.length && j >= 0 ) {  
    if (target > input[i][j]) {
      i++;
    } else if (target === input[i][j]) {
      return [i, j];
    } else {
      j--;
    }
  }
  return [-1, -1];
}

console.log(getRowColumnIndex([
  [1, 4, 7, 12, 15, 1000], //0
  [2, 5, 19, 31, 32, 1001], // 1
  [3, 8, 24, 33, 35, 1002], // 
  [40, 41, 42, 44,45, 1003],
  [99, 100, 103, 106, 128, 1004],
], 44));

/*
 * Complete the 'counts' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY teamA
 *  2. INTEGER_ARRAY teamB
 */

function counts(teamA, teamB) {
  // Write your code here
  
  /**
   * compare each elm of teamA with teamB's
   * if teamA's elm is less than teamB's,
   * increment the counter(initially 0) and 
   * keep on increasing untill teamA's elm is greater than teamB's.
   * and then move to next match of teamB and 
   * start comparing it from TeamA's starting elm
   */
  let result = [];
  teamA = teamA.sort((goal1, goal2) => goal1 - goal2);
  for (let i = 0; i < teamB.length; i++) {
      let start = 0;
      let end = teamA.length - 1;
      while (start <= end) {
          let middle = Math.floor((end+start)/2);
          if (teamA[middle] > teamB[i]) { 
              end = middle - 1;
          } else {
              start = middle + 1;
          }
      }
      result.push(start);
  }
  return result;
}

var arr = [
  {
    group: 'odd',
    value: 1,
  },
  {
    group: 'even',
    value: 2,
  },
  {
    group: 'even',
    value: 2,
  },
  {
    group: 'odd',
    value: 3,
  },
];

function groupBy(arr) {
  let result = {};
  arr.forEach(({ group, value }) => {});
  return result;
}
groupBy(arr);

/**
 *
 */

// [
//     ["PUT", "www.phonepe.com", "10.20.30.40"],
//     ["PUT", "careers.phonepe.com", "10.20.30.50"],
//     ["PUT", "sites.google.com", "142.250.183.238"],
//     ["GET", "example.com"],
//     ["GET", "www.phonepe.com"],
//     ["COUNT", "phonepe.com"],
//     ["COUNT", "com"]
// ]

const txns = [
  {
    category: 'food',
    amount: 100,
    date: '12-22-2021',
  },
  {
    category: 'clothes',
    amount: 1000,
    date: '12-10-2021',
  },
  {
    category: 'travel',
    amount: 500,
    date: '11-22-2021',
  },
  {
    category: 'food',
    amount: 100,
    date: '11-25-2021',
  },
];

const groupBy = (txns, month) => {
  return txns.reduce((acc, item) => {}, {});
};
