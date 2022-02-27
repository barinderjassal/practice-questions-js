/**
 * Create a constructor function(Class) of the definition of Linked list that contains HEAD and TAIL pointers.
 * Initially, both will point to null
 */
function LinkedList() {
  this.head = null;
  this.tail = null;
}

/**
 * Create a constructor function(Class) that represents a NODE of the LinkedList and have three properties
 * VALUE: the value of the node
 * PREV: the PREVIOUS pointer of the node
 * NEXT: the NEXT pointer of the node
 */
function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

// Linked List Operations:

/**
 * The first Operations is ADD_TO_HEAD
 * Create a function on the prototpe of the LinkedList which adds a NODE to the HEAD of the LinkedList.
 */
LinkedList.prototype.addToHead = function (value) {
  /**
   * Create a new NODE and assign its NEXT and PREV values.
   * While adding a new NODE to the HEAD, its NEXT pointer will point to the existing HEAD node,
   * and its PREV pointer will be null because that will be the new NODE.
   */
  var newNode = new Node(value, this.head, null);
  /**
   * Now check if the existing list is empty or not.
   * In other words, if it has the existing HEAD.
   * if it is there, assign its PREV pointer to the newNode
   * else, the TAIL points to the newNode
   */
  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;
  // At last, move the HEAD pointer to the newNode
  this.head = newNode;
};

/**
 * The second Operations is ADD_TO_TAIL
 * Create a function on the prototpe of the LinkedList which adds a NODE to the TAIL of the LinkedList.
 */
LinkedList.prototype.addToTail = function (value) {
  /**
   * Create a new NODE and assign its NEXT and PREV values.
   * While adding a new NODE to the TAIL, its NEXT pointer will be null,
   * and its PREV pointer will be the existing TAIL node
   */
  var newNode = new Node(value, null, this.tail);
  /**
   * Now check if the existing list is empty or not.
   * In other words, if it has the existing TAIL.
   * if it is there, assign its NEXT pointer to the newNode
   * else, the HEAD points to the newNode
   */
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;

  // At last, move the TAIL pointer to the newNode
  this.tail = newNode;
};

/**
 * The third Operations is REMOVE_HEAD
 * Create a function on the prototpe of the LinkedList which removes the HEAD node and return its value
 */
LinkedList.prototype.removeHead = function () {
  // if the LinkedList is empty, return null
  if (!this.head) return null;

  // now get the value of the HEAD node because that we would return from this function
  const val = this.head.value;
  // now the new HEAD would be the current HEAD's next node, basically moving HEAD pointer
  this.head = this.head.next;
  /**
   * Now the new HEAD could be node or null
   * if it is NODE, then its PREV pointer would be null.
   * if it is empty, then the TAIL would be null
   */
  if (this.head) this.head.prev = null;
  else this.tail = null;

  // finally, return the value of the HEAD node that is removed
  return val;
};

/**
 * The fourth Operations is REMOVE_TAIL
 * Create a function on the prototpe of the LinkedList which removes the TAIL node and return its value
 */
LinkedList.prototype.removeTail = function () {
  // if the LinkedList is empty, return null
  if (!this.tail) return null;

  // now get the value of the TAIL node because that we would return from this function
  const val = this.tail.value;
  // now the new TAIL would be the current TAIL's previous node, basically moving TAIL pointer backwards
  this.tail = this.tail.prev;
  /**
   * Now the new TAIL could be node or null
   * if it is NODE, then its NEXT pointer would be null.
   * if it is empty, then the HEAD would be null
   */
  if (this.tail) this.tail.next = null;
  else this.head = null;

  // finally, return the value of the TAIL node that is removed
  return val;
};

/**
 * The fifth Operations is SEARCH a value
 * Create a function on the prototpe of the LinkedList which takes a value and
 * traverse through the LinkedList to find that value
 */

LinkedList.prototype.search = function (value) {
  /**
   * start search from Left to Right. Basically from HEAD.
   * Take a currentNode(currentPointer) and assign HEAD to it in order to start search
   */
  let currentNode = this.head;
  while (currentNode) {
    if (currentNode.value === value) {
      return currentNode.value;
    }
    currentNode = currentNode.next;
  }
  return null;
};

/**
 * Another operation is find all indexOf particular values
 *
 */
LinkedList.prototype.indexOf = function (value) {
  let currentNode = this.head;
  let indexes = [];
  let currentIndex = 0;
  while (currentNode) {
    if (currentNode.value === value) {
      indexes.push(currentIndex);
    }
    currentNode = currentNode.next;
    currentIndex++;
  }
  return indexes || null;
};

/**
 * Traverse through LinkedList and return value of each node. Basically an array
 * Also, return the size of the LinkedList
 * In other words, return an object with properties as an array of values and size of the linkedlist
 */
LinkedList.prototype.traverse = function () {
  if (!this.head) return null;

  let currentNode = this.head;
  let nodeValues = [];
  while (currentNode.next !== null) {
    nodeValues.push(currentNode.value);
    currentNode = currentNode.next;
  }
  // Above condition didn't fetch the last node's value, so you need to specifically add at the end
  nodeValues.push(currentNode.value);
  return {
    nodeValues: nodeValues,
    size: nodeValues.length,
  };
};

/**
 * Create Linked List of N numbers/values
 */
LinkedList.prototype.createDynamicLinkedList = function (values) {
  // just add all values one by one to the Tail using addToTail method
  for (let i = 0; i < values.length; i++) {
    this.addToTail(values[i]);
  }
};

/**
 * Reverse a Doubly linked list
 */

LinkedList.prototype.reverseLinkedList = function (head) {
  let currentNode = head;

  if (!head) return null;

  while (currentNode) {}
};
