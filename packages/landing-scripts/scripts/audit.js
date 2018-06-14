const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const lighthouse = require('lighthouse');
const lighthousePrinter = require('lighthouse/lighthouse-cli/printer');
const chromeLauncher = require('chrome-launcher');


function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then((chrome) => {
    opts.port = chrome.port;
    console.log(chalk.cyan('Preparing lighthouse report...'));
    return lighthouse(url, opts, config).then((results) => {
      console.log(opts, 'lighthouse runned');
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results);
    });
  });
}


module.exports = function audit() {
  const serveScriptPath = path.join(__dirname, './serve');
  const serve = require(serveScriptPath);
  console.log(chalk.cyan('Starting a local server to audit on lighthouse...'));
  serve(({ urls, server }) => {
    // Usage:
    const opts = {
      chromeFlags: ['--show-paint-rects']
    };

    console.log(chalk.cyan('Lauching chrome...'));
    launchChromeAndRunLighthouse(urls.localUrlForBrowser, opts).then((results) => {
      fs.ensureDirSync(path.join(process.cwd(), './audits'));
      lighthousePrinter.write(results, 'html', `./audits/lighthouse-report-${Date.now()}.html`);
      server.close();
    });
  });
};
