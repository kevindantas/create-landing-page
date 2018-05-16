const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [paths.appEntry, paths.appIndexHtml],
  mode: 'development',
  output: {
    path: paths.appOutput,
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    open: true,
    contentBase: paths.appOutput,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /.html$/,
        loader: 'html-loader',
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appIndexHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
