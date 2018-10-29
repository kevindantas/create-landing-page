const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');
const utils = require('./utils');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    logLevel: 'silent',
    contentBase: paths.appSrc,
    watchContentBase: true,
  },
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appEntry,
    paths.appIndexHtml,
  ],
  plugins: [
    ...utils.getHtmlPages(paths.appSrc),
    new webpack.NamedModulesPlugin(),
  ],
});
