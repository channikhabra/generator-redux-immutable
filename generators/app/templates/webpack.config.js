var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'false'))
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: __dirname + '/src',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:<%= port %>',
      'webpack/hot/only-dev-server',
      './app'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: '/static/',
    contentBase: __dirname + '/src/www',
    hot: true
  },
  plugins: [
    //Used to include index.html in build folder
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, '/src/www/index.html')
    }),
    //Allows for sync with browser while developing (like BorwserSync)
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    devFlagPlugin,
    //Transfer Files
    new TransferWebpackPlugin([
      {from: 'www/images', to: 'images'}
    ], path.resolve(__dirname,"src")),
    new ExtractTextPlugin('app.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
            'sass?sourceMap'
        ),
      },
      {test: /\.png$/,  loader: 'url?limit=10000&mimetype=image/png' },
      {test: /\.woff$/, loader: 'file?limit=10000&mimetype=application/font-woff' },
      {test: /\.ttf$/,  loader: 'file?limit=10000&mimetype=application/octet-stream' },
      {test: /\.eot$/,  loader: 'file' },
      {test: /\.svg$/,  loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
