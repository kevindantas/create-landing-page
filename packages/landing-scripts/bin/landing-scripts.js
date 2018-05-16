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

const { spawnSync } = require('child_process');

const scriptPath = require.resolve('../scripts/start.js');

const child = spawnSync('node', [scriptPath], {
  stdio: 'inherit',
});

console.log(child);
