const path = require('path');
const fs = require('fs');
const url = require('url');

const envPublicUrl = process.env.PUBLIC_URL;
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

const getPublicPath = (appPackagePath) => {
  try {
    const { homepage } = require(appPackagePath);
    return envPublicUrl || url.parse(homepage).pathname || '/';
  } catch (e) {
    return '/';
  }
};

module.exports = {
  appPublic: resolvePath('public'),
  appSrc: resolvePath('src'),
  appEntry: resolvePath('src/index.js'),
  appIndexHtml: resolvePath('src/index.html'),
  appOutput: resolvePath('build'),
  appPublicPath: getPublicPath(resolvePath('package.json')),
};
