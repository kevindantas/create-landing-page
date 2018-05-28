const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPublic: resolvePath('public'),
  appSrc: resolvePath('src'),
  appEntry: resolvePath('src/index.js'),
  appIndexHtml: resolvePath('src/index.html'),
  appOutput: resolvePath('build'),
};
