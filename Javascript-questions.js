1 -- > 2 -- > 3 -- > 4-- > null


4-->3-->2-->1-->null

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(next, data) {
  this.next = next;
  this.data = data;
}

var n = new Node(n2, 1);

n2-- > { next: n3, data: 2 };

n3-- > { next: n4, data: 3 };

n4-- > { next: null, data: 4 };

function Reverse() {
  
}
////////////////////



console.log(1 > 2 > 3) 
console.log(3 > 2 > 1)

//// Event Loop

console.log(1)
setTimeout(() => console.log(2), 1000);
// new Promise((resolve) => setTimeout(() => console.log(resolve(3)), 2000));
Promise.resolve(4).then((resolve) => {
  return setTimeout(() => {
    console.log(resolve);
  }, 3000);
});
console.log(5) 


/**
 * 1
 * 4
 * 2
 * 3
 */

/**
 * ***************************
 */
function reverse(word) {
  return word.split('').reverse().join('');
}

function reverseWords(str) {
  var words = str.split(' ');
  let result = [];
  words.map(word => result.push(reverse(word)));
  return result.join(' ');
}

console.log(reverseWords('I love Javascript'));

/**
 * 
 * Scope checking
 */
var x = 3;
var char = 'A';
var foo = {
  x: 2,
  foo: {
    x: 1,
    foo: function () {
      char = 'B';
      return this.x;
    }
  }
}
var go = foo.foo.foo;
console.log(char, go(), foo.foo.foo());

/**
 *  brackets
 **/
const areBracketsAccurate = (input) => {
  const brackets = '[]{}()';
  let stack = [];

  for (let bracket of input) {
    let bracketIndex = brackets.indexOf(bracket);
    
    if (bracketIndex === -1) {
      continue;
    }

    if (bracketIndex % 2 === 0) {
      stack.push(bracketIndex + 1);
    } else {
      if (stack.pop() !== bracketIndex) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

/**
 * Anagram Check
 */
function areStringAnagrams(input1, input2) {
  const str1 = input1.replace('/[^\w]/g').toLowerCase();
  const str2 = input2.replace('/[^\w]/g').toLowerCase();

  return sortString(str1) === sortString(str2);
}

function sortString(str) {
  return str.split('').sort().join('').trim();
}

/**
 * currying
 */

 function sum(a, b, c) {
   return a + b + c;
 }
 
 function curry(func) {
   // func is sum
   return function curry(...args) {
     if (args.length >= func.length) {
       return func.apply(this, args);
     } else {
       // call the same func again --> recursion
       return function (...args2) {
         return curry.apply(this, args.concat(args2));
       };
     }
   };
 }
 
var x = curry(sum);
x(0)(10)(1, 2, 3);

/**
 * Event Loop
 */

setTimeout(() => console.log(1))
setTimeout(() => console.log(2))
setTimeout(() => console.log(3), 100)
setTimeout(() => console.log(4), 200)
var a  = new Promise((resolve, reject) => {
  console.log(5);
  setTimeout(() => {
    console.log(6); 
    resolve(7);
  })
});
a.then((res)=> console.log(res));
Promise.resolve(8).then((result) => console.log(result));
 
/**
 * flatMap
 */
// Let's say we want to remove all the negative numbers
// and split the odd numbers into an even number and a 1
let a = [5, 4, -3, 20, 17, -33, -4, 18]

a.flatMap((n) =>
  n < 0 ? []
    : (n % 2 == 0) ? [n]
      : [n - 1, 1]);

// [4, 1, 4, 20, 16, 1, 18]


/*
- Write method findPath
- Should take two params:
    - object
    - keys separated by dots as string
- Return value if it exists at that path inside the object, else return undefined
*/

var obj = {
  a: {
    b: {
      c: 12,
      j: false
    },
    k: null,
    c: 10
  }
};

function findPath(obj, path) {
  let paths = path.split('.');
  let current = obj;

  for (let i = 0; i < paths.length; i++) {
    if (current[paths[i]] === undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }

  return current;
}

console.log(findPath(obj, 'a.k')); //null
console.log(findPath(obj, 'a.b.c')); // 12
console.log(findPath(obj, 'a.b')); // {c: 12, j: false}
console.log(findPath(obj, 'a.b.d')); // undefined

/**
 * Get Indexes of those numbers from the input array
 * which are making the sum === target
 * 
 * a + b = target
 * b = target - a
 */

function isSumFoundForTwoNumbers(input, target) {
  // have an object to map the difference in it
  let obj = {};

  for (let i = 0; i < input.length; i++) {
    // get the other value by subtracting the current value from the target
    // and map it in the object with the current index
    let diff = target - input[i];
    if (obj[diff]) {
      return [obj[diff], i];
    }
    // if the diff is not in the object
    // map the current value as key and index as value
    obj[input[i]] = i;
  }
  return [];
}
isSumFoundForTwoNumbers([1, 2, 3, 4, 5, 6], 10);

/**
 * given an array of promises and resolve of each promise
 * is the query param of next promise.
 */
 function fetchCall(url, queryParam = '') {
  // return fetch(url + queryParam);
  return Promise.resolve(`${url}?${queryParam}`).then((res) => res);
} 

function hitSequential(urlArray) {
  let temp = '';
  urlArray.forEach(async (url) => {
    temp = await fetchCall(url, temp);
  });
}

/**
 * Deep clone any Array or Object
 */

function deepClone(input) {
  let clone;
  clone = Array.isArray(input) ? [] : {};
  for (let key in input) {
    if (typeof input[key] === 'object') {
      clone[key] = deepClone(input[key]);
    } else {
      clone[key] = input[key];
    }
  }
  return clone;
}

/**
 *  Find the total weight of the array.
 *  Total weight = 1*1 + 6*1 + 3*2 + 4*2 + 5*3 + 7*3 + 9*1
 *                  1   +  6 +  6   + 8 +   15 +  21  +   9      
 */
var arr = [1,6,[ 3,4,[ 5,7 ] ], 9];

function getTotalWeight(arr, weight = 1, result = []) {
  let sum = 0;
  for (let el of arr) {
    if (Array.isArray(el)) {
      sum = sum + getTotalWeight(el, weight + 1 , result);
    } else {
      sum = sum + el * weight;
    }
  }

  return sum;
}
getTotalWeight(arr);

/**
 * Zip array values, 
 * A Zip function that creates an Array of grouped elements. 
 * Each element in the Array contains an item from each Array passed as an argument.
 * 
 * zip([1,2,3], [4,5,6]);
 * 
 * Output: [[1,4], [2,5], [3,6]]
 */

const zip = (arr, ...arrs) => {
  return arr.map((value, index) => {
    return arrs.reduce((acc, arrayItem) => [...acc, arrayItem[index]], [value]);
  });
}

/**
 * Flat a nested object by appending every nested key with its parent 
 * using _ or #
 * 
 */
// sample input
const object = {
  name:{
    first:"Sudhanshu",
    last:"Singh",
  },
  address:{
    permanent:{
      streetNumber:'45'
    },
    temporary:{
      streetNumber:'55',
    }
  }
}
// sample output
const newObject = {
  name_first:"sudhansh",
  address_permanent_streetNumber:"45",
}

let flatObj = {};

function flatObjectFunc(obj, concatProp = '') {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      flatObjectFunc(obj[key], concatProp + key + '_');
    } else {
      flatObj[concatProp + key] = obj[key];
    }
  }
  return flatObj;
}

console.log(flatObjectFunc(object));

/**
 * 
 * Get unique values from an array including reference types
 * i.e. remove duplicate values
 */

const arr = [1, false, 1, { a: true }, { b: false }, { a: true }];

var uni = [...new Set(arr.map(JSON.stringify))].map(JSON.parse);

/**
 * Copy an object, even if its properties are non-enumerable
 */

function copy(obj) {
  const copy = Object.create(Object.getPrototypeOf(obj))
  const propNames = Object.getOwnPropertyNames(obj)

  propNames.forEach(function(name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    Object.defineProperty(copy, name, desc)
  })

  return copy
}

const obj1 = { a: 1, b: 2 };
const obj2 = copy(obj1);

/**
 *  get partial intersection of two arrays
 */
const arr4 = [ 'debounce', 'bounce',  'scare', 'wallmart', 'surface' ];
const arr5 = [ 'bounce', 'wall', 'face', 'surf' ];

const partialIntersection = (arr1, arr2) => {
  return arr1.filter(item => arr2.some(str => item.includes(str)));
};

console.log(partialIntersection(arr4, arr5));
// result [ 'debounce', 'bounce', wallmart', 'surface' ];


/**
 * A function to test whether each corresponding string in first array
 * has some characters of the other string in the other array but at the
 * same index
 * 
 * e.g.
 * a = ['hello', 'hi'];
 * b = ['world', 'bye'];
 * 
 * a[0]        b[0]         common chars      Print
 * 'hello'     'world'      l, o               'YES'
 * 
 * a[1]         b[1]        common chars      Print
 * 'hi'         'bye'         nothing          'NO'
 */

function getIntersection(a, b) {
  var arr = [];
  a.forEach((item, index) => {
    let secondStringArray = b[index].split('');
    for (let i = 0; i < secondStringArray.length; i++) {
      if (item.includes(secondStringArray[i])) {
        return arr.push('FOUND');
      }
    }
    arr.push('NOT FOUND');
  });

  arr.forEach((item) => {
    if (item === 'FOUND') {
      console.log('YES');
    } else {
      console.log('NO');
    }
  })
}
getIntersection(['hello', 'hi'], ['world', 'bye']);

/**
 * Hoisting Example
 */
function parent() {
  var hoisted = "I am a variable";
  function hoisted() {
    return "I’m a function";
  }
  return hoisted(); // "I’m a function";
}
parent();

/**
 * 
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 * 
 * SendinBlue
 */
const longestCommonPrefix = (strs) => {
  let longestPrefix = '';
  if (strs.length === 0 || strs === null || strs[0] === "") {
    return longestPrefix;
  }
  
  if (strs.length === 1) {
    return strs[0];
  }
  
  for (let i = 0; i < strs[0].length; i++) {
    let char = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) {
        return longestPrefix;
      }
    }
    longestPrefix += char;
  }
  
  return longestPrefix; 
};

/**
 * print the values of milliseconds in the array in the same given order
 * using setTimeout
 */
const arr = [8000, 500, 300, 400, 100];
function test(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(new Promise((resolve) => setTimeout(() => resolve(arr[i]), arr[i])));
  }
  Promise.all(result).then((values) => {
    console.log(values);
  });
}
test(arr);

/**
 * 
 * Shallow Comparison of two objects
 */
function isEqual(obj1, obj2) {
  const keyNames = Object.getOwnPropertyNames(obj1).sort(); // Object.keys(obj1) could be used
  const keyNames2 = Object.getOwnPropertyNames(obj2).sort();

  if (keyNames.length !== keyNames2.length) return false;

  keyNames.forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      return false;
    } 
  });
  return true;
}

const obj1 = {
  age: 30,
  name: 'abc',
  address: 'amritsar'
}

const obj2 = {
  address: 'amritsar',
  name: 'abc',
  age: 30
}

console.log(isEqual(obj1, obj2));

/**
 * 
 * Deep Comparison of two objects which are nested
 */
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1).sort();
  const keys2 = Object.keys(object2).sort();

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * 
 * return the maximum sum of elements that are continuous in the array
 */
function ArrayChallenge(arr) {  
  let currentSum = 0;
  let maximumSum = 0;

  for (let el of arr) {
    // update the max sum with the addition of currentSum and current element of the array
    currentSum = Math.max(0, el + currentSum);
    maximumSum = Math.max(maximumSum, currentSum);
  }
  return maximumSum;
}
ArrayChallenge([-2, 5, -1, 7, -3]);

/**
 * given a alphanumeric string and get the pair of continuous even number
 */
function getEvenPairs(str) { 
  let counter = 0;
  for (let el of str) {
   if (isNaN(el % 2)) {
     counter = 0;
   } else if (el % 2 === 0){
     counter++;
   }    
  }
  return counter === 2;
}
getEvenPairs("f178svg3k19k46"); // o/p is 46

/**
 * 
 * Get Spiral form of 2D arrays
 * 
   [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
  ]
  output = [1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]
 */
function spiral(matrix) {
  const arr = [];
    
  while (matrix.length) {
    arr.push(
      ...matrix.shift(),
      ...matrix.map(a => a.pop()),
      ...(matrix.pop() || []).reverse(),
      ...matrix.map(a => a.shift()).reverse()
    );
  }
  return arr;
}

spiral([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]);

/**
 * Sort the string chars in the alphanumerci string, keeping the numbers at their positions
 */

const str = "b1dc2a";
// output = "a1bc2d";

function sortAlphaNumericString(str) {
  let strArray = str.split("").sort();

  // create two pointers, keep num pointer at the begining and string pointer at the first char in sorted array
  let charPointer = 0;
  let numPointer = 0;

  while (strArray[charPointer].charCodeAt(0) < 97) {
    // take charPointer to the first character of the sorted str array
    charPointer++;
  }

  for (let i = 0; i < strArray.length; i++) {
    if (str[i].charCodeAt(0) < 97) {
      str = str.substring(0, i) + strArray[numPointer++] + str.substring(i + 1);
    } else {
      console.log(charPointer);
      str =
        str.substring(0, i) + strArray[charPointer++] + str.substring(i + 1);
      console.log(str);
    }
  }
  console.log(str);
}
sortAlphaNumericString("b1dc2a");

/**
 * Optimized Fibonacci series by memoization
 * given a n to the function, find nth number in the fibonacci series
 * 
 * Time Complexity: O(2n) which is simplified as => O(n)
 * Space Complexity: O(n)
 */

const fib = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}

fib(50);

/**
 * Given a m * n Grid, where m is the number of rows and n is the number of columns,
 * find the number of ways a person can reach from top-left to bottom-right of the grid
 * 
 * A person can only move either right or down in the grid, not diagonally
 * 
 * Example:
 * if there is a grid of 2 * 3, there are 3 possible ways to reach from top-left
 * to bottom-right.
 * 
 * Base cases:
 * if m is 1 and n is 1, then start and end positions are basically same, so there is only 1 way, return 1
 * if m is 0 and n is 1, then it actually doesn't make sense if there are 0 rows and 1 column, so return 0
 * 
 * Time complexity is O(2 to the power m + n);
 * Space complexity is O(n + m)
 * 
 * Optimization:
 * so we need to store the same m&&n's value at that instant to the memoized object, just like the fib,
 * so our key would be something like (m + ',' + n) in the object
 */

const gridTraveller = (m, n, memo = {}) => {
  const key = m + ',' + n;
  if (key in memo) return memo[key];

  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  memo[key] = gridTraveller(m - 1, n, memo) + gridTraveller(m, n - 1, memo);
  return memo[key];
}

gridTraveller(3, 2);
gridTraveller(4, 3);
gridTraveller(14, 13);

/**
 * Pass an object to a function, a key and a value in string
 * and if that key-value is present in it, 
 * return that object
 * 
 */

const obj = {
	id: 'val1',
  name:'name1',
  objParam: {
  	id: 'val4',
    name:'name4'
  },
  arrayParam: [
  	{
    	id: 'val2',
      name: 'name2'
    },
    {
    	id: 'val3',
      name: 'name3'
    }
  ]
}

const getObjectByKeyAndValue = (obj, prop, value) => {
	for (let key in obj) {
  	if (key === prop && value === obj[key]) {
    	return obj;
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
    	return getObjectByKeyAndValue(obj[key], prop, value);
    } else {
    	const array = obj[key]; // array
      const newArr = array.filter((obj) => {
      	return getObjectByKeyAndValue(obj, prop, value);
      })
      return newArr[0] || -1;
    }
  }
  return -1;
}

console.log(getObjectByKeyAndValue(obj, 'name', 'name3'))

// You're creating a game with some amusing mini-games, and you've decided to make a simple variant of the game Mahjong.

// In this variant, players have a number of tiles, each marked 0-9. The tiles can be grouped into pairs or triples of the same tile. For example, if a player has "33344466", the player's hand has a triple of 3s, a triple of 4s, and a pair of 6s. Similarly, "55555777" has a triple of 5s, a pair of 5s, and a triple of 7s.

// A "complete hand" is defined as a collection of tiles where all the tiles can be  grouped into any number of triples (zero or more) and exactly one pair, and each tile is used in exactly one triple or pair.

// Write a function that takes a string representation of a collection of tiles in no particular order, and returns true or false depending on whether or not the collection represents a complete hand.

// tiles1 = "11133555"           # True.  111 33 555
// tiles2 = "111333555"          # False. There are three triples, 111 333 555 but no pair.
// tiles3 = "00000111"           # True.  000 00 111. Your pair and a triplet can be of the same value
//                               #        There is also no limit to how many of each tile there is.
// tiles4 = "13233121"           # True.  Tiles are not guaranteed to be in order
// tiles5 = "11223344555"        # False. There cannot be more than one pair
// tiles6 = "99999999"           # True.  You can have many of one tile
// tiles7 = "999999999"          # False.
// tiles8 = "9"                  # False.
// tiles9 = "99"                 # True.  One pair.
// tiles10 = "000022"            # False.
// tiles11 = "888889"            # False. There cannot be any tiles left over.
// tiles12 = "889"               # False. There cannot be any tiles left over.
// tiles13 = "88888844"          # True.  Two triples and one pair
// tiles14 = "77777777777777"    # True.  Four triples and one pair
// tiles15 = "1111111"       	  # False.
// tiles16 = "1111122222"        # False.

// complete(tiles1)  => True
// complete(tiles2)  => False
// complete(tiles3)  => True
// complete(tiles4)  => True
// complete(tiles5)  => False
// complete(tiles6)  => True
// complete(tiles7)  => False
// complete(tiles8)  => False
// complete(tiles9)  => True
// complete(tiles10) => False
// complete(tiles11) => False
// complete(tiles12) => False
// complete(tiles13) => True
// complete(tiles14) => True
// complete(tiles15) => False
// complete(tiles16) => False

// Complexity Variable
// N - Number of tiles in the input string


function complete(tiles) {
  const tileArray = tiles.split('');
  const tileObj = tileArray.reduce((acc, tile) => {
    if (!acc[tile]) {
      acc[tile] = 1;
    } else {
      acc[tile]++;
    }
    return acc;
  }, {});
  
  console.log(tileObj);
  const countChars = Object.values(tileObj);
  let flag = true;
  
  for (let i = 0; i < countChars.length; i++) {
    let isModOf3 = countChars[i] % 3;
    if (isModOf3 !== 2 && countChars[i] !== 2) {
      flag = false;
      break;
    }
  }
  return flag;
}

console.log(complete('00111'));