const Webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');

const extractCommons = new Webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
});

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
    admin: './admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader:'babel-loader',
            options: {
              presets: [
                ['es2015', {modules: false}]
              ]
            }
          }
        ]
      },

      /* extract css to separate file in build/dist */
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css-loader', 'sass-loader'])
      },

      /* inline css to html */
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 10000} //convert images < 10k to b64 strings
          }
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    extractCommons,
    new Webpack.NamedModulesPlugin(),
  ]
};

module.exports = config;
