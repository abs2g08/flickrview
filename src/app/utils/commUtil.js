export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function genKey(className, id=0) {
  return `${className}_${id}`;
}

/*
   fixes weird bug when rending react-router server side
   where store doesn't update view when action is fired in
   componentDidMount method
*/
export function isoMorphicFix(callback) {
  window.setTimeout(callback, 0);
}
