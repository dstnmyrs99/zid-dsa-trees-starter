/* eslint-disable strict */
class BinarySearchTree {
  // your code here
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key) {
    if (this.key === null) this.key = key;
    if (this.key > key) {
      if (this.left) return this.left.insert(key);
      this.left = new BinarySearchTree(key, null, this);
    }
    if (this.key < key) {
      if (this.right) return this.right.insert(key);
      this.right = new BinarySearchTree(key, null, this);
    }
  }

  find(key) {
    if (this.key === key) return this.key;
    if (this.left && key < this.key) return this.left.find(key);
    if (this.right && key > this.key) return this.right.find(key);
    return -1;
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
      /* If the node only has a left child,
           then you replace the node with its left child. */
        this._replaceWith(this.left);
      } else if (this.right) {
      /* And similarly, if the node only has a right child,
           then you replace it with its right child. */
        this._replaceWith(this.right);
      } else {
      /* If the node has no children, then
           simply remove it and any references to it
           by calling `this._replaceWith(null)`. */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}
