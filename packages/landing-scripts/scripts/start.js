process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const WebpackServe = require('webpack-serve');
const config = require('../config/webpack.config.dev');

function createDevServer() {
  return WebpackServe({
    config,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    quiet: true,
    open: true,
    https: {
      key: fs.readFileSync('../security/localhost.key'),
      cert: fs.readFileSync('../security/localhost.cert'),
      passphrase: '1231',
    },
    dev: {
      logLevel: 'silent',
    },
    hot: {
      logLevel: 'silent',
      https: true,
    },
  });
}

createDevServer();
