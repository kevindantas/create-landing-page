const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: paths.appEntry,
  output: {
    path: paths.appOutput,
    filename: 'bundle.[hash].js',
  },
  plugins: [
    new UglifyJsPlugin({
      exclude: /node_modules/,
    }),
    new OptimizeCssAssetsPlugin(),
  ],
});
