let counter = 0;
const getData = function (...args) {
  //just checking the arguments functionality
  console.log('fetching result...', args, counter++);
};

/**
 * Debounce
 *
 * A function call would be made only when there is a pause of certain delay in user activity
 * Example: Typing in search box, resizing the window.
 */
const debounce = function (fn, delay) {
  let timer;
  return function (...args) {
    let context = this;
    clearTimeout(timer); // clear timeout if the activities are continuous
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
const onKeyPressHandler = debounce(getData, 300);

/**
 * Throttling
 *
 * A next function call would be made only when the time difference
 * in the user's continuous activities exceeds a certain limit.
 *
 *  |||||||||||||||||||||||||||||||||| ---> continuous function calls
 *  \/---lim exp---\/-----lim exp---\/
 *  call           2nd             3rd
 *  init           call            call
 */

const throttle = function (fn, limit) {
  let flag = true;
  return function () {
    let context = this,
      args = arguments;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};
const clickHandler = throttle(getData, 500);

/**
 * Event Emitters in JS
 *
 */

var arr = [];
const eventObj = {
  register: (event, cb) => {
    arr.push({
      event: event,
      value: cb,
    });
  },
  emit: (event) => {
    arr.forEach((e) => {
      if (e.event === event) {
        return e.value();
      }
    });
  },
};

// register an event
eventObj.register('abc', () => console.log('abc event'));

// activate that event
eventObj.emit('abc');

//////////////////////////////////////////

/**
 * Bind polyfill without using call or apply
 */
var person = {
  name: 'abc',
  age: 10,
};

function getDetails(...args) {
  console.log(args);
  return `${this.name} - ${this.age}`;
}

Function.prototype.myBind = function (obj, ...args) {
  let func = this;
  // this points to the function on which bind is called

  return function () {
    obj.func = func;
    console.log(obj);
    return obj.func(args);
  };
};

var showData = getDetails.myBind(person, 'noida');
showData();

/**
 * 
 * instanceOf Polyfill
    If you wish you could implement your own version of the instanceof operator, using pure JavaScript.
 */

function instanceOf(object, constructor) {
  while (object != null) {
    if (object == constructor.prototype) return true;
    object = Object.getPrototypeOf(object);
  }
  return false;
}

instanceOf('test', String);
instanceOf(true, Boolean);

/**
 * If we want to copy the whole object(does not matter if any of that object property is enumerable or not),
 * we can use Object.create() method
 */

const object1 = {
  property1: 42,
  property2: 'name',
};

var object2 = Object.create(
  Object.prototype,
  Object.getOwnPropertyDescriptors(object1)
);

// this looks like below code explanation
// Object.proptotype is just the prototype of main Object class in JS
// which has methods like constructor, hasOwnProperty, toString, valueOf, etc.

var object2 = Object.create(Object.getPrototypeOf(object1), {
  property1: {
    value: 42,
    writable: true,
    configurable: true,
    enumerable: true,
  },
  property2: {
    value: 'name',
    writable: true,
    configurable: true,
    enumerable: true,
  },
});

/**
 * scope
 */
var myObject = {
  foo: 'bar',
  func: function () {
    var self = this;
    console.log('outer func: this.foo = ' + this.foo); // bar
    console.log('outer func: self.foo = ' + self.foo); // bar

    (function () {
      console.log('inner func: this.foo = ' + this.foo); // undefined
      console.log('inner func: self.foo = ' + self.foo); // bar
    })();
  },
};

myObject.func();

/**
 *
 */
var b = 15;

function exec(func) {
  var b = 10;
  func();
}

function foo() {
  var b = 5;

  function baz() {
    console.log(b);
  }

  exec(baz);
}
foo();

/**
 * You are given a row of N coins, each coin showing heads or tails.
 * The coins need to be arranged in such a way that they form an alternating sequence of heads and tails.
 * Write an algorithm to find the minimum number of coin flips required to achieve this.
 *
 * e.g. "THTHTT"
 *
 * Flips required = 1 (flip the last coin)
 */
function flip(ch) {
  return ch == 'H' ? 'T' : 'H';
}

//  Utility method to get minimum flips when
//  alternate string starts with expected char
function getFlipWithStartingCharcter(str, expected) {
  let flipCount = 0;
  for (let i = 0; i < str.length; i++) {
    //  if current character is not expected,
    // increase flip count
    if (str.charAt(i) != expected) flipCount++;

    //  flip expected character each time
    expected = flip(expected);
  }
  return flipCount;
}

// method return minimum flip to make binary
// string alternate
function minFlipToMakeStringAlternate(str) {
  //  return minimum of following two
  //  1) flips when alternate string starts with 0
  //  2) flips when alternate string starts with 1
  let change1 = getFlipWithStartingCharcter(str, 'H');
  let change2 = getFlipWithStartingCharcter(str, 'T');
  console.log(change1);
  console.log(change2);
  return Math.min(change1, change2);
}

// input - 2{a}3{bc2{d}}
// output aa bcdd bcdd bcdd
// bcdd
/**
 * iterate over the string
 * if it is a number put that in stack
 *
 * make another stack for the content and temp string to append each char untill we found another number or bracket.
 *
 * get all the content untill the closing bracket or if I found closing bracket,
 * pop out the number from the stack and multiply that content in bracket with that number.
 *
 * if there is on opening bracket, put the number before the bracket in the stack again and repeat step 2
 *
 */

const input = '2{a}3{bc2{d}}';
function decryptStr(str) {
  // add implementation here
}
console.log(decryptStr(input));

/**
 * Pub-Sub pattern
 * Just Save event callbacks and not event names
 */
class MyEventEmitter {}

MyEventEmitter.prototype.eventsList = [];

MyEventEmitter.prototype.on = function (cb) {
  this.eventsList.push(cb);
  // get the latest last index of the events list and on that this(current) event will be added
  const index = this.eventsList.length - 1;
  const context = this;

  return {
    ...context,
    unsubscribe() {
      context.eventsList = context.eventsList.splice(index, 1);
    },
  };
};

MyEventEmitter.prototype.emit = function (...eventNames) {
  // emit can have multiple args so call the emitter func using apply
  this.eventsList.forEach((event) => event.apply(null, [...eventNames]));
};

const ev = new MyEventEmitter();

const sub1 = ev.on((msg) => {
  console.log('Sub1 -> ', msg);
});

const sub2 = ev.on((msg) => {
  console.log('Sub2 -> ', msg);
});

ev.emit('First time emit');

/* Expected Output
 * Sub1 -> First time emit
 * Sub2 -> First time emit
 */

sub1.unsubscribe();

ev.emit('Second time emit');
// /* Expected Output
// * Sub2 -> Second time emit
// */

const sub3 = ev.on((msg1, msg2) => {
  console.log('Sub 3 ->', msg1, msg2);
});

ev.emit('emit1', 'emit2');
/* Expected Output
 * Sub 2 -> emit1
 * Sub 3  -> emit1, emit2
 */
