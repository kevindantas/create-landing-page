process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const WebpackServe = require('webpack-serve');
const config = require('../config/webpack.config.dev');

function createDevServer() {
  return WebpackServe({
    config,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    quiet: true,
    open: true,
    dev: {
      logLevel: 'silent',
    },
    hot: {
      logLevel: 'silent',
    },
  });
}

createDevServer();
