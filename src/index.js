const chalk = require('chalk');
const clear = require('clear');
const inquirer = require('inquirer');
const minimist = require('minimist');
const questions = require('./questions');
const generator = require('./generator');

const { log, error } = console;

log(chalk.blue.bgWhite('dwdawdaw'));

inquirer.prompt(questions)
  .then(answers => answers)
  .catch(err => error(err));
