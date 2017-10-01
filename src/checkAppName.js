const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');


/**
 * Ask the user for permission to overwrite files if the folder exists
 * @param {String} name
 * @return {Promise}
 */
function askForOvewrite(name) {
  return new Promise(resolve => {
    return inquirer
      .prompt({
        type: 'confirm',
        name: 'continueConflict',
        message: chalk.bold.bgRed.white(
          `You have a folder named: '${name}', the some files WILL be overwrited, continue? `
        ),
      })
      .then(anwser => {
        if (!anwser.continueConflict) {
          process.exit(1);
        }
        generateAppFolder(name);
        resolve(anwser.continueConflict);
      });
  });
}


/**
 * Create a new folder if not exists
 * @param {String} name Folder name
 */
function generateAppFolder(name) {
  fs.ensureDirSync(name);
  console.log(chalk.green('Folder ready!'));
}


/**
 * Check if exists a folder with the same app name
 * @param {String} name - App name
 * @return {Promise}
 */
function checkAppName(name) {
  return new Promise(resolve => {
    // Check if the folder already exists
    if (fs.existsSync(name)) {
      resolve(askForOvewrite(name));
    } else {
      resolve(generateAppFolder(name));
    }
  });
}

module.exports = checkAppName;
