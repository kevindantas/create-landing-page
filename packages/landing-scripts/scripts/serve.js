process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const httpServer = require('http-server');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths');

module.exports = function serve() {
  const scriptPath = path.join(__dirname, './build');
  spawn.sync('node', [scriptPath], {
    stdio: 'inherit',
  });

  const server = httpServer.createServer({
    root: paths.appOutput,
  });

  const port = process.env.port || 8080;
  const host = process.env.host || '0.0.0.0';
  const urls = prepareUrls('http', host, port);

  return server.listen(port, host, () => {
    console.log(chalk.yellow('Server avaliable on:'));
    console.log();
    console.log('Local:\t\t\t', chalk.cyan(urls.localUrlForTerminal));
    console.log('On your network:\t', chalk.cyan(urls.lanUrlForTerminal));
  });
};
