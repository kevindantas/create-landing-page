process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const selfsigned = require('selfsigned');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const clearConsole = require('react-dev-utils/clearConsole');
const { choosePort, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');

/**
 * Get HTTPS server config
 * @return {Object}
 */
function configureHttps() {
  const certPath = path.join(__dirname, '../ssl/server.pem');

  let validCertExists = fs.existsSync(certPath);
  if (validCertExists) {
    const now = new Date();
    const certStats = fs.statSync(certPath);
    const certTTL = 1000 * 60 * 60 * 24;

    // If the certificate was been created more than 30 days ago
    if ((now - certStats.ctime) / certTTL > 30) {
      console.log('SSL certificate is older than 30 days, removing...');
      fs.removeSync(certPath);
      validCertExists = false;
    }
  }

  // Generate a new certificate if there's not a valid cert
  if (!validCertExists) {
    console.log('Generating new SSL certificate');
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const pems = selfsigned.generate(attrs, {
      algorithm: 'sha256',
      days: 30,
      keySize: 2048,
    });

    fs.writeFileSync(certPath, pems.private + pems.cert, { encoding: 'utf-8' });
  }

  const fakeCert = fs.readFileSync(certPath);
  return {
    key: fakeCert,
    cert: fakeCert,
  };
}

function printInstructions(urls) {
  console.log('You can view your app on the browser.');
  console.log();
  console.log(`Local: \t\t\t${urls.localUrlForTerminal}`);
  console.log(`On your network: \t${urls.lanUrlForTerminal}`);
}

/**
 * Get development server config
 * @param {Array<String>} args - Arguments when execute the script
 */
function getServerConfig(protocol, host, port) {
  // HTTPS is disabled by default
  let https = false;

  if (protocol === 'https') {
    https = configureHttps();
  }

  return {
    host,
    port,
    https,
    hot: true,
    logLevel: 'silent',
  };
}

function createCompiler(urls) {
  const compiler = webpack(config);

  compiler.hooks.invalid.tap('invalid', () => {
    clearConsole();
    console.log('Compiling...');
  });


  compiler.hooks.done.tap('done', (stats) => {
    // Clear the old console messages
    clearConsole();

    const rawMessages = stats.toJson({}, true);
    const messages = formatWebpackMessages(rawMessages);

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      messages.errors.forEach(e => console.log(e));
      return;
    }

    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('Compiled successfully!'));
      printInstructions(urls);
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      messages.warnings.forEach(w => console.log(w));
    }
  });

  return compiler;
}

function watchFolderChanges(ignored, callback) {
  const watcher = chokidar.watch(paths.appSrc, {
    // ignored,
  });
  watcher.on('add', () => {
    console.log('New file');
    callback();
  });
  watcher.on('change', () => {
    console.log('File changed');
    callback();
  });
  watcher.on('unlink', () => {
    console.log('File unlinked');
    callback();
  });
}

module.exports = function createDevServer() {
  const args = process.argv.slice(2);
  const protocol = args.indexOf('--https') > -1 ? 'https' : 'http';
  const host = process.env.HOST || '0.0.0.0';
  const defaultPort = process.env.PORT || 3000;
  choosePort(host, defaultPort).then((port) => {
    if (!port) return false;
    const serverConfig = getServerConfig(protocol, host, port);
    const urls = prepareUrls(protocol, serverConfig.host, serverConfig.port);
    const compiler = createCompiler(urls);
    const server = new WebpackDevServer(
      compiler,
      serverConfig,
    );
    watchFolderChanges(/.*\.(?!html|hbs|handlebars|htm)/, () => server.middleware.invalidate());
    return server.listen(port, host, () => {
      openBrowser(urls.localUrlForBrowser);
    });
  });
};
