import request from 'request';
import { respondOrDie } from '../utils';

const flickerRoot = 'https://api.flickr.com';

function query(tag, tagmode='all', format='json') {
  return `?tags=${tag}&tagmode=${tagmode}&format=${format}`;
};

//https://www.codeschool.com/discuss/t/trying-to-call-flickr-api-with-angularjs-but-getting-syntaxerror-unexpected-token-when-using-nojsoncallback-1/24832
function parseFlickrJSONP(str) {
  //TO-DO: make funcitonal
  str = str.trim().replace(/^jsonFlickrFeed\(/,'').replace(/\}\)$/,'}');
  str = str.replace(/\\'/g,"'");
  str = JSON.parse(str);
  return str;
}

function pluckItemIdFromLink(link) {
  const itemId = link.split('/')[5];
  return itemId;
}

const publicPhotoFeed = (req, res)=> {
  const queryStr = query(req.query.tags);
  const url = `${flickerRoot}/services/feeds/photos_public.gne${queryStr}`;

  request.get({
    url,
    json: true
  }, (err, resp, body)=> {
    respondOrDie(err, ()=> {
      body = parseFlickrJSONP(body);

      const items = body.items;
      items.map((item)=> {
        item.id = pluckItemIdFromLink(item.link);
      });

      res.send({
        items
      });
    });
  });
};

export default {
  publicPhotoFeed
}
