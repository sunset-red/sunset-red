function makeServer() {
  const express = require('express');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const bodyParser = require('body-parser');

  const signup = require('./routes/sign-up.js');
  const findFriends = require('./routes/find-friends');
  const addFriends = require('./routes/add-firend');
  const showMyFriends = require('./routes/show-my-friends');
  const publishSays = require('./routes/publish-says');
  const leaveWords = require('./routes/leave-words');
  const getNameById = require('./routes/get-name-by-id');
  const modifyPersonMessage = require('./routes/update-person-message');

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

  app.use('/', getNameById);
  app.use(publishSays);
  app.use(loginIn);
  app.use(personMessage);
  app.use('/', signup);

  app.use('/', leaveWords);
  app.use('/', modifyPersonMessage);

  app.use('/', findFriends);
  app.use('/', addFriends);
  app.use('/', showMyFriends);

  const server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Example app listening at port %s', port);
  });

  return server;
}
module.exports = makeServer;
