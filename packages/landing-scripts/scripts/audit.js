const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const lighthouse = require('lighthouse');
const lighthousePrinter = require('lighthouse/lighthouse-cli/printer');
const chromeLauncher = require('chrome-launcher');


function launchChromeAndRunLighthouse(url, opts = {}, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then((chrome) => {
    opts.port = chrome.port;
    console.log(chalk.cyanBright('Preparing lighthouse report...'));
    return lighthouse(url, opts, config).then((results) => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results);
    });
  });
}

function getDatetime() {
  const now = new Date();
  // Date
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  // Time
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hour}${minute}${second}`;
}


module.exports = function audit() {
  const serveScriptPath = path.join(__dirname, './serve');
  const serve = require(serveScriptPath);
  console.log(chalk.cyanBright('Starting a local server to audit on lighthouse...'));
  serve(({ urls, server }) => {
    console.log(chalk.cyanBright('Preparing chrome...'));
    launchChromeAndRunLighthouse(urls.localUrlForBrowser).then((results) => {
      const reportDate = getDatetime();
      const auditsPath = path.join(process.cwd(), './audits');
      const reportFilename = `lighthouse-report-${reportDate}.html`;
      const reportPath = path.join(auditsPath, reportFilename);

      fs.ensureDirSync(auditsPath);

      lighthousePrinter.write(results, 'html', reportPath);
      console.log(chalk.greenBright('Lghthouse reports generated: '));
      console.log(chalk.default.greenBright(`Report path: \t /audits/${reportFilename}`));
      server.close();
    });
  });
};
