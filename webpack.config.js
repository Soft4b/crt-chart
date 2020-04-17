const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vendor: [
      'amcharts3/amcharts/amcharts',
      'amcharts3/amcharts/serial',
      'amcharts3/amcharts/stock',
      'amcharts3/amcharts/themes/dark'
    ],
    main: './src/js/index.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src/js'),
      use: {
        loader: 'babel-loader',
        options: {
          // presets: 'env'
        }
      }
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',

    }),
    /*new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })*/
  ]
};
