var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'false'))
});

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:<%= port %>',
      'webpack/hot/only-dev-server',
      './app'
    ]
  },
  output: {
    path: __dirname + '/src/endpoint/static',
    filename: '[name].js',
    publicPath: '/static/',
    contentBase: __dirname + '/src/endpoint',
    hot: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    devFlagPlugin,
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
