var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  colors: true,
  contentBase: config.output.contentBase,
  publicPath: config.output.publicPath,
}).listen(<%= port %>, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:<%= port %>');
});
