#!/usr/bin/env node

/**
 *
 */
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const args = process.argv.slice(2);
const scriptName = args[0];

// List of avaliable scripts on landing-scripts
const avaliableScripts = new Set(['start', 'build', 'deploy']);

// If the script does not exists, show the information and exit the application
if (!avaliableScripts.has(scriptName)) {
  console.log(`Unknown script "${scriptName}".`);
  console.log('For more informantion see: https://github.com/kevindantas/create-landing-page');
  process.exit(1);
}

const { spawnSync } = require('child_process');

const scriptPath = require.resolve(`../scripts/${scriptName}.js`);

spawnSync('node', [scriptPath], {
  stdio: 'inherit',
});

