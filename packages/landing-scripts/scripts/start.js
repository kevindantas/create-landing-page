process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const WebpackServe = require('webpack-serve');
const config = require('../config/webpack.config.dev');

function createDevServer() {
  return WebpackServe({
    config,
    port: 3000,
  });
}

createDevServer();
