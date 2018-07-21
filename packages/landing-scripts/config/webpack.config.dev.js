const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: paths.appOutput,
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appIndexHtml,
    }),
    new webpack.NamedModulesPlugin(),
  ],
});
