function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value, next) {
  this.value = value;
  this.next = next;
}

LinkedList.prototype.addToHead = function (value) {
  var newNode = new Node(value, this.head);

  if (this.head) {
    newNode.next = this.head;
  } else {
    this.tail = newNode;
  }

  this.head = newNode;
};

LinkedList.prototype.addToTail = function (value) {
  var newNode = new Node(value, null);

  if (this.tail) {
    this.tail.next = newNode;
  } else {
    this.head = newNode;
  }

  this.tail = newNode;
};

LinkedList.prototype.removeHead = function () {
  if (!this.head) return null;

  const val = this.head.value;

  // new head
  this.head = this.head.next;

  if (!this.head) {
    this.tail = null;
  }

  return val;
};

LinkedList.prototype.removeTail = function () {
  if (!this.tail) return null;

  const val = this.tail.value;

  let current = this.head;
  let newTail = current;
  while (current.next) {
    newTail = current;
    current = current.next;
  }
  this.tail = newTail;

  // if there is a tail then mark its next as null
  // else head will also points to null because there is no LinkedList
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  return val;
};

/**
 *  Reverse a Linked List
 */
LinkedList.prototype.reverse = function () {
  // at first, the current pointer is at the head, from where we start to reverse
  let current = this.head;

  // at first, the previous pointer is null
  let previous = null;

  while (current) {
    // save the next node using next pointer
    let next = current.next;

    // here change the flow of pointer to backward direction
    current.next = previous;

    // now move the previous pointer forward by assigning the current to previous
    previous = current;

    // move current forward by storing the next node to the current pointer
    current = next;
  }
  return previous;
};
