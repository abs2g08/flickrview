import config from '../config';
import express from 'express';
import { iso, flickr } from './controllers';

const app = express();

let serverConfig;

if(process.env.NODE_ENV === 'prod') {
  serverConfig = config.dist;
} else {
  serverConfig = config.dev;
}

app.use('/assets', express.static(`${__dirname}/../assets`));

// set up Jade
app.set('views', `${__dirname}/../`);
app.set('view engine', 'jade');

app.get('/publicPhotoFeed', flickr.publicPhotoFeed);

// front-end isomorphic routing
app.get('/*', iso.index);

const server = app.listen(serverConfig.port, ()=> {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Instaview App listening at http://%s:%s', host, port);
});
