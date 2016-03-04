import request from 'request';
import { respondOrDie, JSONP } from '../utils';

const flickerRoot = 'https://api.flickr.com';

function query(tag, tagmode='all', format='json') {
  return `?tags=${tag}&tagmode=${tagmode}&format=${format}`; //nojsoncallback=?
};

const publicPhotoFeed = (req, res)=> {
  const queryStr = query(req.query.tags);
  const url = `${flickerRoot}/services/feeds/photos_public.gne${queryStr}`;

  request.get({
    url,
    json: true
  }, (err, resp, body)=> {
    respondOrDie(err, ()=> {
      body = JSONP.parse(body);
      //console.log(body);
      res.send({
        items: body
      });
    });
  });
};

export default {
  publicPhotoFeed
}
