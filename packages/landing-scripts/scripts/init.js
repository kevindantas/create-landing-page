const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

function copyTemplate(appDir, templatePath) {
  fs.copySync(templatePath, appDir);
  fs.removeSync('.gitignore');
  fs.moveSync(
    path.join(appDir, 'gitignore'),
    path.join(appDir, '.gitignore'),
  );
}

function addPackageScripts(appDir) {
  const scripts = {
    start: 'landing-scripts start',
    build: 'landing-scripts build',
  };

  const packageJson = require(`${appDir}/package.json`);
  packageJson.scripts = scripts;
  fs.writeFileSync(
    path.join(appDir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );
}

function init(appDir, appName, templatePath) {
  const isUsingYarn = fs.existsSync(path.join(appDir, 'yarn.lock'));
  const command = isUsingYarn ? 'yarn' : 'npm';

  copyTemplate(appDir, templatePath);
  addPackageScripts(appDir);
  console.log(chalk.green('Project ready!'));
  console.log();
  console.log('To start the project typing:');
  console.log();
  console.log(chalk.cyan('cd'), appName);
  console.log(chalk.cyan(command), 'start');
}

module.exports = init;
