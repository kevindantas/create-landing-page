const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');
const utils = require('./utils');


module.exports = merge(baseConfig, {
  mode: 'production',
  entry: paths.appEntry,
  output: {
    path: paths.appOutput,
    filename: 'js/bundle.[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath: paths.appPublicPath,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
    }),
    ...utils.getHtmlPages(paths.appSrc, {
      minify: {
        removeComments: true,
        removeTagWhitespace: true,
        preserveLineBreaks: false,
        collapseWhitespace: true,
      },
    }),
    new UglifyJsPlugin({
      exclude: /node_modules/,
      parallel: true,
    }),
    new OptimizeCssAssetsPlugin(),
  ],
});
