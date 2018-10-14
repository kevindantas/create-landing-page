const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');
const utils = require('./utils');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: paths.appOutput,
    watchContentBase: true,
  },
  plugins: [
    ...utils.getHtmlPages(paths.appSrc),
    new webpack.NamedModulesPlugin(),
  ],
});
