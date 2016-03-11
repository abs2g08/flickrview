import request from 'request';

const flickrAPIRoot = 'https://api.flickr.com';

function query(tag, tagmode='all', format='json') {
  return `?tags=${tag}&tagmode=${tagmode}&format=${format}`;
};

//https://www.codeschool.com/discuss/t/trying-to-call-flickr-api-with-angularjs-but-getting-syntaxerror-unexpected-token-when-using-nojsoncallback-1/24832
function parseFlickrJSONP(str) {
  str = str.trim().replace(/^jsonFlickrFeed\(/,'').replace(/\}\)$/,'}');
  str = str.replace(/\\'/g,'\'');
  str = JSON.parse(str);
  return str;
}

function pluckItemIdFromLink(link) {
  const itemId = link.split('/')[5];
  return itemId;
}

const publicPhotoFeed = (req, res)=> {
  const queryStr = query(req.query.tags);
  const url = `${flickrAPIRoot}/services/feeds/photos_public.gne${queryStr}`;

  request.get({
    url,
    json: true
  }, (err, resp, body)=> {
    if(!err) {
      body = parseFlickrJSONP(body);

      const items = body.items;
      items.map((item)=> {
        item.id = pluckItemIdFromLink(item.link);
      });

      res.send({
        items
      });
    } else {
      res.status(500).send({
        errorMsg: err.error_message
      });
    }
  });
};

export default {
  publicPhotoFeed
}
