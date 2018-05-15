process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const config = require('../config/webpack.config.base');

const compiler = webpack(config);

// compiler.run(((err, stats) => {
//   // console.log(stats);
// }));

const app = express();
app.use(webpackDevMiddleware(compiler));


app.listen(3000, () => console.log('Server running on port: 3000'));

// console.log(compiler);
