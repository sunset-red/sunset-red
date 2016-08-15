function makeServer() {
  const express = require('express');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const signup = require('./routes/sign-up.js');
  const bodyParser = require('body-parser');

  const app = express();
  const compiler = webpack(webpackConfig);

  const loginIn = require('./routes/login-in');
  const personMessage = require('./routes/find-person-message');

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(express.static('public'));
  app.use(loginIn);
  app.use(personMessage);
  app.use('/', signup);
  app.use(require('./routes/find-friends'));
  app.use(require('./routes/leave-words'));
  app.use(require('./routes/show-leave-message'));

  const server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Example app listening at port %s', port);
  });

  return server;
}
module.exports = makeServer;
