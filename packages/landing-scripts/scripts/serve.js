process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const spawn = require('cross-spawn');
const paths = require('../config/paths');

function serve() {
  const args = process.argv.slice(2);
  const scriptPath = path.join(__dirname, './build');
  spawn.sync('node', [scriptPath], {
    stdio: 'inherit',
  });

  return spawn('http-server', [paths.appOutput, ...args], {
    stdio: 'inherit',
  });
}

serve();
