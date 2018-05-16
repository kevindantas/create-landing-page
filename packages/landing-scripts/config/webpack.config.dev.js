const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    contentBase: paths.appOutput,
    watchContentBase: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
