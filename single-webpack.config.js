const Webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', {modules: false}]
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        // use: [
        //   'style-loader',
        //   'css-loader',
        //   'sass-loader'
        // ]
        loader: extractCSS.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 } //Convert images < 10k to b64 strings
          }
        ]
      }
    ]
  },
  plugins: [
    extractCSS
  ]
};

module.exports = config;
