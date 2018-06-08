process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackServe = require('webpack-serve');
const selfsigned = require('selfsigned');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');
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

/**
 * Get development server config
 * @param {Array<String>} args - Arguments when execute the script
 */
function getServerConfig(args) {
  // HTTPS is disabled by default
  let https = false;

  const useHttps = args.indexOf('--https') > -1;
  if (useHttps) {
    https = configureHttps();
  }

  return {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    quiet: true,
    open: true,
    https,
    dev: {
      logLevel: 'silent',
    },
    hot: {
      logLevel: 'silent',
      https: !!https,
    },
  };
}

function createCompiler() {
  const compiler = webpack(config);

  let isFirstCompile = true;
  compiler.hooks.invalid.tap('Compiling', () => {
    clearConsole();
    console.log('Compiling...');
  });

  // Format messages
  compiler.hooks.done.tap('FormatMessages', (stats) => {
    const rawMessages = stats.toJson({}, true);
    const messages = formatWebpackMessages(rawMessages);

    // If is the first compile don't clearConsole to show the app URL
    if (!isFirstCompile) clearConsole();
    isFirstCompile = false;

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      messages.errors.forEach(e => console.log(e));
      return;
    }

    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      messages.warnings.forEach(w => console.log(w));
    }
  });

  return compiler;
}

function createDevServer() {
  const args = process.argv.slice(2);
  const serverConfig = getServerConfig(args);

  const compiler = createCompiler();
  return WebpackServe({
    compiler,
    ...serverConfig,
  });
}

createDevServer();
