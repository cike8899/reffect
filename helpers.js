export function isPromise(val) {
  return val && typeof val.then === "function";
}

export function isObject(value) {
  return Object.prototype.toString.call(value).split(" ")[1] === "Object]";
}
