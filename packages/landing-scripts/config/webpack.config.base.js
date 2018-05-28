const paths = require('./paths');
const WebpackMessages = require('webpack-messages');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [paths.appEntry, paths.appIndexHtml],
  output: {
    path: paths.appOutput,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // Use "oneOf" to transverse the rules to prevent
      // loaders process a output from other loader, e.g.:
      // Generated CSS from Sass beign loaded by the /.css$/ rule
      {
        oneOf: [
          {
            test: /\.(png|jpg|gif|webp|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.html$/,
            use: 'html-loader',
          },
          {
            test: /\.scss$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.css$/,
            use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader',
          },
          {
            exclude: /\.(js|html|css|scss)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]',
              },
            }],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new WebpackMessages({
      name: 'landing-page',
    }),
  ],
};
