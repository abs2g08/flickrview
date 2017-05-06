export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function genKey(className, id=0) {
  return `${className}_${id}`;
}

/*
   Fixes weird bug when rending react server side.
   Store doesn't update view when action is fired in
   componentDidMount method
*/
export function isomorphicFix(callback) {
  window.setTimeout(callback, 0);
}
