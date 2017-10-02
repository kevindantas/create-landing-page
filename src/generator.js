const fs = require('fs-extra');
const path = require('path');
const format = require('string-template');

/**
 * 
 * @param {String} appName - App name
 * @param {Object} options - Options selected by the user to create the scaffold
 */
function generateScaffold(appName, options) {
  // Create a folder for the source code
  const folderPath = `./${appName}/`;
  fs.ensureDir(folderPath + 'src');

  const templatesPath = path.resolve(__dirname + '/templates');

  // Get template for the package.json
  const package = fs.readFileSync(
    path.resolve(templatesPath + '/package.json.template'),
    'utf-8'
  );

  // Create package.json
  const packageString = format(package, {
    appName,
    cssPreprocessor: options.cssPreprocessor,
  });
  fs.writeFileSync(folderPath + '/package.json', packageString);

  
  console.log(packageString);
}

module.exports = generateScaffold;
