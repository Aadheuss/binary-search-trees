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

  const insert = function (val, node = root) {
    // Once leave node is reached insert the node

    if (node === null) {
      root = Node(val);
    } else {
      if (val === node.data) {
        return;
      }

      if (val < node.data) {
        if (node.left === null) {
          node.left = Node(val);
        } else {
          insert(val, node.left);
        }
      } else {
        if (node.right === null) {
          node.right = Node(val);
        } else {
          insert(val, node.right);
        }
      }
    }
  };

  return {
    get root() {
      return root;
    },
    insert,
  };
  // Root attribute uses the return value of buildTree
};

const nodeTest = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6, 6345, 324]);

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

nodeTest.insert(2);
nodeTest.insert(7);
nodeTest.insert(3);
nodeTest.insert(33);
nodeTest.insert(69);
prettyPrint(nodeTest.root);

// Write insert and delete functions that accepts a value to insert/delete
