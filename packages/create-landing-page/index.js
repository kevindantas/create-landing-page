#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const commander = require('commander');
const { execSync, spawnSync } = require('child_process');
const questions = require('./questions');
const checkAppName = require('./checkAppName');
const packageJson = require('./package.json');

let appName;
const program = commander
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')}`)
  .action((name) => {
    appName = name;
  })
  .on('--help', () => {
    console.log();
    console.log(`   Only ${chalk.green('<project-directory>')} is needed`);
    console.log();
    console.log('   If you have any problems, feel free to file a issue');
    console.log(`     ${chalk.cyan('https://github.com/kevindantas/create-landing-page/issues/new')}`);
  })
  .parse(process.argv);

if (!appName) {
  program.help();
}

const getAppDir = name => `${process.cwd()}/${name}`;

function shouldUseYarn() {
  try {
    execSync('yarn --version');
    return true;
  } catch (e) {
    return false;
  }
}


function buildPackageJson(appDir) {
  const appPackageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(
    path.join(appDir, 'package.json'),
    JSON.stringify(appPackageJson, null, 2),
  );
}

function installDependencies(appDirPath) {
  let command;
  let args = [];
  if (shouldUseYarn()) {
    command = 'yarn';
    args = args.concat(['add', '--cwd', appDirPath]);
  } else {
    command = 'npm';
    args = args.concat(['install', '--save', '--prefix', appDirPath]);
  }

  args.push('landing-scripts');

  spawnSync(command, args, {
    stdio: 'inherit',
  });
}

function createLanding(name) {
  // Check if exists a folder with the given app name
  checkAppName(name).then(() => {
    inquirer
      .prompt(questions)
      .then(() => {
        // const scriptsPath = getScriptsPackage();
        const appDirPath = getAppDir(name);
        buildPackageJson(appDirPath, name);
        installDependencies(appDirPath);
        const landingScriptsPath = `${appDirPath}/node_modules/landing-scripts`;
        const init = require(`${landingScriptsPath}/scripts/init`);
        const templatePath = `${landingScriptsPath}/template`;
        init(appDirPath, appName, templatePath);
      })
      .catch(err => console.error(err));
  });
}
createLanding(appName);
