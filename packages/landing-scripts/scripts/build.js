process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const paths = require('../config/paths');
const config = require('../config/webpack.config.prod');

function copyPublicFolder() {
  fs.copySync(
    path.join(paths.appPublic),
    path.join(paths.appOutput),
  );
}

module.exports = function build() {
  fs.emptyDirSync(paths.appOutput);
  copyPublicFolder();
  const compiler = webpack(config);
  compiler.run();
};
