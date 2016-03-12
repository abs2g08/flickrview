/*
  liveReload: sever that hosts compiled js/css assets (used for live reload)
  dist: a mock distribution server
  dev: a development server that hosts the isomorphic app
*/

module.exports = {
  liveReload: {
    port: 8080,
    host: 'localhost'
  },
  dist: {
    port: 3000,
    host: 'localhost'
  },
  dev: {
    port: 3000,
    host: 'localhost'
  },
  filename: {
    app: 'app.js',
    style: 'style.css'
  }
};
