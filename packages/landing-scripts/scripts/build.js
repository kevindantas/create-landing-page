process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const fs = require('fs-extra');
const paths = require('../config/paths');
const config = require('../config/webpack.config.prod');

function build() {
  fs.emptyDirSync(paths.appOutput);
  const compiler = webpack(config);
  compiler.run();
}

build();
