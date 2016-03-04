const respondOrDie = function(err, resp) {
  if(!err) {
    resp();
  } else {
    res.status(500).send({
      errorMsg: err.error_message
    });
  }
};

const JSONP = {
  parse(str) {
    str = str.substring(str.indexOf('(') + 1, str.lastIndexOf(')'));
    return JSON.parse(str);
  }
}

export {
  respondOrDie,
  JSONP
};
