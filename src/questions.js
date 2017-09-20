/**
 * Questions needed to create the boilerplate
 */
const questions = [{
  type: 'list',
  name: 'templating-engine',
  message: 'Do you gonna use any templating engine?',
  choices: [{
    name: 'Handlebars',
    value: 'handlebars',
  }, {
    name: 'Pug (Jade)',
    value: 'pug',
  }, {
    name: 'EJS',
    value: 'ejs',
  }, {
    name: 'No, I\'ll use just HTML',
    value: 'html',
  }]
}, {
  type: 'list',
  name: 'css-preprocessor',
  message: 'Want to use a CSS preprocessor?',
  choices: [{
    name: 'Sass',
    value: 'sass',
  }, {
    name: 'Less',
    value: 'less',
  }, {
    name: 'Stylus',
    value: 'stylus',
  }, {
    name: 'No, I\'ll just use CSS',
    value: 'css'
  }]
}, {
  type: 'list',
  name: 'task-runner',
  message: 'Which task runner would you like to use?',
  choices: [{
    name: 'Gulp',
    value: 'gulp'
  }, {
    name: 'Grunt',
    value: 'grunt'
  }]
}]

module.exports = questions;
