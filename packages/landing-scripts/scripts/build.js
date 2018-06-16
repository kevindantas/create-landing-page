process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const fs = require('fs-extra');
const paths = require('../config/paths');
const config = require('../config/webpack.config.prod');

module.exports = function build() {
  fs.emptyDirSync(paths.appOutput);
  const compiler = webpack(config);
  compiler.run();
};
