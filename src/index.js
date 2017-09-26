const fs = require('fs-extra');
const chalk = require('chalk');
const clear = require('clear');
const inquirer = require('inquirer');
const minimist = require('minimist');
const questions = require('./questions');
const checkAppName = require('./checkAppName');
const generator = require('./generator');

var argv = minimist(process.argv.slice(2));

const { log, error } = console;


const appName = process.argv.slice(2);

const creating = createLanding(appName)
creating.next();

function* createLanding(name) {
  // Check if exists a folder with the given app name
  checkAppName(appName);
  inquirer.prompt(questions)
    .then(answers => generator(answers))
    .catch(err => error(err));
}
