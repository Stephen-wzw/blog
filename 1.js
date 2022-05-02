function _getClass (obj) {
  if (obj === null) return "null";
  return Object.prototype.toString.call(obj).slice(8, -1);
}

console.log(_getClass([]));