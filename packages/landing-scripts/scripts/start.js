process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const WebpackServe = require('webpack-serve');
const config = require('../config/webpack.config.base');

function createDevServer() {
  return WebpackServe({
    config,
  });
}

createDevServer();
