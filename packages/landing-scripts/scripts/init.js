const fs = require('fs-extra');
const path = require('path');

function copyTemplate(appDir, templatePath) {
  fs.copySync(templatePath, appDir);
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
  copyTemplate(appDir, templatePath);
  addPackageScripts(appDir);
  console.log(appDir, appName, templatePath);
}

module.exports = init;
