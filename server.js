function makeServer() {
  const express = require('express');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const signup = require('./routes/sign-up.js');
  const bodyParser = require('body-parser');

  const app = express();
  const compiler = webpack(webpackConfig);

  const routers = require('./db');
  const selectData = require('./routes/find-person-message');

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(express.static('public'));

  app.post('/login', routers.findItem);
  app.post('/message', selectData.save);
  app.use('/', signup);
  app.use(require('./routes/find-friends'));

  const server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Example app listening at port %s', port);
  });

  return server;
}
module.exports = makeServer;
