const respondOrDie = function(err, resp) {
  if(!err) {
    resp();
  } else {
    res.status(500).send({
      errorMsg: err.error_message
    });
  }
};

const jsonClean = function(str){
  str = str
         .replace(/\\n/g, "\\n")
         .replace(/\\'/g, "\\'")
         .replace(/\\"/g, '\\"')
         .replace(/\\&/g, "\\&")
         .replace(/\\r/g, "\\r")
         .replace(/\\t/g, "\\t")
         .replace(/\\b/g, "\\b")
         .replace(/\\f/g, "\\f");
  str = str.replace(/[\u0000-\u0019]+/g,"");
  return JSON.parse(str);
}

export {
  respondOrDie,
  jsonClean
};
