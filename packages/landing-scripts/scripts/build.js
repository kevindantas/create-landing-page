process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');
const paths = require('../config/paths');
const config = require('../config/webpack.config.prod');

function copyPublicFolder() {
  fs.copySync(path.join(paths.appPublic), path.join(paths.appOutput));
}

module.exports = function build() {
  clearConsole();

  fs.emptyDirSync(paths.appOutput);
  console.log(chalk.green('Old build files removed.'));

  console.log('Creating an optimized production build...');
  copyPublicFolder();
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    const messages = formatWebpackMessages(stats.toJson());
    if (messages.errors.length) {
      console.log(chalk.red('Failed to create production build.'));
      messages.errors.forEach(errorMessage => console.log(errorMessage));
      process.exit(0);
    }
    console.log(chalk.green('Production build successfully created.'));
  });
};
