const del = require('del');
const gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

/**
 * Handle the errors, prevent gulp crashes
 * @param {*} error 
 */
function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

const paths = {
  html: ['src/*.html'],
  styles: ['src/css/*.{styleExtension}', '!src/css/^(\_)*.{styleExtension}'],
  build: './build',
  buildAssets: './build/assets'
};

gulp.task('clean', done => {
  del('build/*', done);
});

gulp.task('html', function() {
  return gulp
    .src(paths.html)
    .pipe(gulp.dest(paths.build))
});

/**
 * Create the static CSS files
 */
gulp.task('css', function() {
  return gulp
    .src(paths.styles)
    .pipe(plugins.{cssPreprocessor}())
    .on('error', swallowError)
    .pipe(gulp.dest(`${paths.buildAssets}/css`))
    .pipe(browserSync.stream());
});

/**
 * Run the dev server with browser-sync
 */
gulp.task('browser-sync', function() {
  browserSync.init({
    notify: false,
    port: 8000,
    server: 'build',
    open: false
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']).on('change', browserSync.reload);
  gulp.watch(paths.styles, ['css']);
});

gulp.task('default', ['clean', 'html', 'css', 'browser-sync', 'watch']);
