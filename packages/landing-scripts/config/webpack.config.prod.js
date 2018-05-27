const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appIndexHtml,
      minify: {
        removeComments: true,
        removeTagWhitespace: true,
        preserveLineBreaks: false,
        collapseWhitespace: true,
      },
    }),
    new UglifyJsPlugin({
      exclude: /node_modules/,
    }),
    new OptimizeCssAssetsPlugin(),
  ],
});
