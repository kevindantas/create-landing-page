const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [paths.appEntry, paths.appIndexHtml],
  output: {
    path: paths.appOutput,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.html$/,
        loader: 'html-loader',
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
