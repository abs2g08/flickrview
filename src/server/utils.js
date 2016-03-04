const respondOrDie = function(err, resp) {
  if(!err) {
    resp();
  } else {
    res.status(500).send({
      errorMsg: err.error_message
    });
  }
};

//https://www.codeschool.com/discuss/t/trying-to-call-flickr-api-with-angularjs-but-getting-syntaxerror-unexpected-token-when-using-nojsoncallback-1/24832/2
const JSONP = {
  parse(str) {
    //str = str.replace('jsonFlickrFeed(', '');
    //str = str.replace('})', '}');
    //str = str.stringify(data, undefined, 2);

    str = str.trim().replace(/^jsonFlickrFeed\(/,'').replace(/\}\)$/,'}');
    str = str.replace(/\\'/g,"'");
    str = JSON.parse(str);
    return str;
  }
}

export {
  respondOrDie,
  JSONP
};
