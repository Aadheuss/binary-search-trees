const Node = (data, left = null, right = null) => {
  return { data, left, right };
};

// Takes an array of data and turns it into a balanced binary tree full
// of Node objects appropriately placed (don't forget to sort and remove duplicates!)
// The buildTree function should return the level-0 root node

const filterAndSort = (arr) => {
  return Array.from(new Set(arr)).sort((a, b) => (a > b ? 1 : -1));
};

const recurseTree = (arr, start = 0, end = arr.length - 1) => {
  const mid = Math.floor((arr.length - 1) / 2);
  const leftArr = arr.slice(start, mid);
  const rightArr = arr.slice(mid + 1);

  if (start > end) {
    return null;
  } else {
    return Node(arr[mid], buildTree(leftArr), buildTree(rightArr));
  }
};

const buildTree = (arr) => {
  const filteredAndSorted = filterAndSort(arr);
  return recurseTree(filteredAndSorted);
};

const tree = (arr) => {
  let root = buildTree(arr);

  const insert = (val, node = root) => {
    if (root === null) {
      // Insert the first node, if node is null
      root = Node(val);
    }

    if (node === null) {
      return Node(val);
    }

    if (val === node.data) {
      return node;
    }

    if (val < node.data) {
      node.left = insert(val, node.left);
    } else {
      node.right = insert(val, node.right);
    }

    return node;
  };

  const remove = (val, node = root) => {
    // Base case
    if (node === null) {
      return node;
    }

    if (val === node.data) {
      // We reach here when the root is the node to be deleted

      // If one of the children is empty
      if (node.left === null) {
        const temp = node.right;
        delete node;
        return temp;
      } else if (node.right === null) {
        const temp = node.left;
        delete node;
        return temp;
      } else {
        // If both children exist
        let successorParent = node;

        // Find successor
        let successor = node.right;
        while (successor.left !== null) {
          successorParent = successor;
          successor = successor.left;
        }

        // Delete successor. SInce successor
        // is always left child of its parent
        // we can safely make successor's right
        // right child as left of its parent.
        // if there is no succ, then assign
        // succ.right to succParent.right
        if (successorParent !== node) {
          successorParent.left = successor.right;
        } else {
          successorParent.right = successor.right;
        }

        // Copy Successor Data to root
        node.data = successor.data;
        console.log(node.data);

        // Delete Successor and return root
        delete data;
        return node;
      }
    }

    // Recursive calls for ancestors of node to be deleted
    if (val < node.data) {
      node.left = remove(val, node.left);
      return node;
    } else {
      node.right = remove(val, node.right);
      return node;
    }
  };

  const find = (val, node = root) => {
    if (val === node.data || node === null) {
      return node;
    }

    if (val < node.data) {
      return find(val, node.left);
    } else {
      return find(val, node.right);
    }
  };

  const q = [];

  const levelOrder = (callback, node = root) => {
    if (node === null) {
      return;
    }

    q.push(node);

    // while there is at least one discovered node
    while (q.length !== 0) {
      const current = q[0];
      callback(current);

      if (current.left !== null) {
        q.push(current.left);
      }
      if (current.right !== null) {
        q.push(current.right);
      }

      // Removing the element at front
      q.shift();
    }
  };

  return {
    get root() {
      return root;
    },
    insert,
    remove,
    find,
    levelOrder,
  };
  // Root attribute uses the return value of buildTree
};

const nodeTest = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6, 6345, 324]);
const nodeTest1 = tree();

// Print the tree in structured format
// This function will expect to receive the root of your tree as the value for the Node parameter
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(nodeTest.root);
console.log(nodeTest.find(23));
nodeTest.levelOrder((a) => console.log(a.data));
// Write insert and delete functions that accepts a value to insert/delete
