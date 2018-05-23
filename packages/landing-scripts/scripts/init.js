const path = require('path');

function getTemplatePath() {
  const templatePath = path.resolve(`${__dirname}/../template`);
  const installationDir = process.cwd();
  console.log(templatePath, installationDir);
}

function init() {
  getTemplatePath();
  console.log(process.cwd());
}

module.exports = init;
