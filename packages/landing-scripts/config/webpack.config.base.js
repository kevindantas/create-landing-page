const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: paths.appEntry,
  mode: 'development',
  output: {
    path: paths.appOutput,
    filename: 'bundle.js',
  },
  module: {
    rules: [
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
  plugins: [new HtmlWebpackPlugin({
    inject: true,
    template: paths.appIndexHtml,
  })],
};
