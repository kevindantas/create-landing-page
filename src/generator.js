const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const format = require('string-template');

/**
 * 
 * @param {String} appName - App name
 * @param {Object} options - Options selected by the user to create the scaffold
 */
function generateScaffold(appName, options) {
  const { cssPreprocessor } = options;
  const styleExtensions = {
    sass: 'sass',
    less: 'less',
    stylus: 'styl',
  };
  const styleExtension = styleExtensions[cssPreprocessor];

  // Create a folder for the source code
  const folderPath = `./${appName}/`;
  fs.ensureDir(folderPath + 'src');

  const templatesPath = path.resolve(__dirname + '/templates');

  // Get template for the package.json
  const package = fs.readFileSync(
    path.resolve(templatesPath + '/package.json'),
    'utf-8'
  );

  // Create package.json
  const packageString = format(package, {
    appName,
    cssPreprocessor,
  });
  fs.writeFileSync(folderPath + '/package.json', packageString);

  // Get the gulpfile
  const gulpfile = fs.readFileSync(
    path.resolve(templatesPath + '/gulpfile.js'),
    'utf-8'
  );

  // Create gulpfile.js
  const gulpfileString = format(gulpfile, {
    styleExtension,
    cssPreprocessor,
  });
  fs.writeFileSync(folderPath + '/gulpfile.js', gulpfileString);

  console.log(chalk.green('Project created!'))
  console.log(' ');
  console.log(chalk('Run the following command to start the code:'));
  console.log(' ');
  console.log(chalk.white('cd '+chalk.cyan(appName)))
  console.log(chalk.cyan('yarn start'))
}

module.exports = generateScaffold;
