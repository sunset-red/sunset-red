import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import signup from './routes/sign-up.js'
import bodyParser from 'body-parser';

const app = express();
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));

app.use('/', signup);

app.listen(3000, function() {
  console.log("server started at http://localhost:3000");
});
