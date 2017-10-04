const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const commander = require('commander');
const questions = require('./questions');
const generator = require('./generator');
const checkAppName = require('./checkAppName');
const packageJson = require('../package.json');

let appName;
const program = commander
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')}`)
  .action(name => {
    appName = name;
  })
  .on('--help', () => {
    console.log();
    console.log(`   Only ${chalk.green('<project-directory>')} is needed`);
    console.log();
    console.log('   If you have any problems, feel free to file a issue');
    console.log(
      `     ${chalk.cyan(
        'https://github.com/kevindantas/create-landing-page/issues/new'
      )}`
    );
  })
  .parse(process.argv);

if (!appName) {
  program.help();
}

createLanding(appName);

function createLanding(name) {
  // Check if exists a folder with the given app name
  checkAppName(appName).then(() => {
    inquirer
      .prompt(questions)
      .then(answers => generator(appName, answers))
      .catch(err => error(err));
  });
}
