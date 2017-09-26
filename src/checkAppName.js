const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');

/**
 * Check if exists a folder with the same app name
 * @param {String} name - App name
 */
module.exports = (name) => {
  const ref = checkAppName(name);
 
  function* checkAppName(name) {
    console.log('called');
    // Check if the folder already exists
    if (!fs.existsSync(name)) {
      // If the folder exists prompt the user to generate the files
      const anwser = yield inquirer.prompt({
        type: 'confirm',
        name: 'continueConflict',
        message: chalk.bold.bgRed.white(` You have a folder named: '${name}', the some files WILL be overwrited, continue? `),
      })
      console.log(anwser);
      if (!anwser.continueConflict) {
        process.exit(1);
      }
    }
  }

  console.log(ref);

  if (!ref.next().done) {
    ref.next();
  }
}
