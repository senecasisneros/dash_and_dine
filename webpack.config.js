const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
  devtool: 'eval',

  entry: [
    'bootstrap-loader',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
    new Dotenv({
      path: '.env', // Path to .env file (this is the default)
      safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      },
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.s[ac]ss$/, loaders: ['style', 'css', 'sass']},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      // Bootstrap 3 jquery requirement
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' }
    ]
  }
}
