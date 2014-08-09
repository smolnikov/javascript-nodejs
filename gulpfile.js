/**
 * NB: All tasks are initialized lazily, even plugins are required lazily,
 * running 1 task does not require all tasks' files
 */

const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const development = (process.env.NODE_ENV == 'development');

const jsSources = [
  'hmvc/**/*.js', 'modules/**/*.js', 'tasks/**/*.js', '*.js'
];

function lazyRequireTask(path) {
  var args = [].slice.call(arguments, 1);

  return function(callback) {
    var task = require(path).apply(this, args);

    return task(callback);
  };
}

function wrapWatch(watch, task) {
  return function(callback) {
    if (process.env.NODE_ENV == 'development') {
      gulp.watch(watch, [task]);
    } else {
      callback();
    }
  };
}

gulp.task('lint-once', lazyRequireTask('./tasks/lint', { src: jsSources }));

gulp.task('lint-or-die', lazyRequireTask('./tasks/lint', { src: jsSources, dieOnError: true }));

gulp.task('lint', ['lint-once'], wrapWatch(jsSources, 'lint'));

// usage: gulp loaddb --db fixture/db
gulp.task('loaddb', lazyRequireTask('./tasks/loadDb'));

gulp.task("nodemon", ['link-modules'], lazyRequireTask('./tasks/nodemon', {
  script: "./bin/server",
  ignore: '**/client/', // ignore hmvc apps client code
  watch:  ["hmvc", "modules"]
}));

gulp.task("client:livereload", lazyRequireTask("./tasks/livereload", { watch: "public/**/*.*" }));

gulp.task('link-modules', lazyRequireTask('./tasks/linkModules', { src: ['client', 'modules/*', 'hmvc/*'] }));

gulp.task("client:sync-resources", lazyRequireTask('./tasks/syncResources', {
  'assets/fonts': 'public/fonts',
  'assets/img':   'public/img'
}));

gulp.task("client:sync-css-images-once", lazyRequireTask('./tasks/syncCssImages', {
  src: 'styles/**/*.{png,svg,gif,jpg}',
  dst: 'public/i'
}));

gulp.task('client:sync-css-images', ['client:sync-css-images-once'],
  wrapWatch('styles/**/*.{png,svg,gif,jpg}', 'client:sync-css-images-once')
);


gulp.task('client:sprite-once', lazyRequireTask('./tasks/sprite', {
  spritesSearchFsRoot: 'client',
  spritesWebRoot:      '/i',
  spritesFsDir:        'public/i',
  styleFsDir:          'styles/sprites'
}));

//gulp.task('client:sprite', ['client:sprite-once'], wrapWatch("client/**/*.sprite/**", 'sprite'));

gulp.task('client:clean-compiled-css', function(callback) {
  fs.unlink('./public/styles/base.css', function(err) {
    if (err && err.code == 'ENOENT') err = null;
    callback(err);
  });
});

// Show errors if encountered
gulp.task('client:compile-css-once',
  // need sprite here, because it generates sprite.styl required by other .styl's
  ['client:clean-compiled-css', 'client:sprite-once'],
  lazyRequireTask('./tasks/compileCss', {
    src: './styles/base.styl',
    dst: './public/styles'
  })
);

gulp.task('client:minify', lazyRequireTask('./tasks/minify', {
  root: './public'
}));


gulp.task('client:compile-css', ['client:compile-css-once'], wrapWatch(["styles/**/*.styl", "styles/**/*.sprite/**"], "client:compile-css-once"));


gulp.task("client:browserify:clean", lazyRequireTask('./tasks/browserifyClean', { dst: './public/js'}));


gulp.task("client:browserify", ['client:browserify:clean'], lazyRequireTask('./tasks/browserify'));


// compile-css and sprites are independant tasks
// run both or run *-once separately
gulp.task('run', [
  'nodemon', 'client:livereload',
  "client:sync-resources", 'client:compile-css', 'client:browserify', 'client:sync-css-images']);

gulp.task('tutorial:import', lazyRequireTask('tutorial/tasks/import', {
  root:        'javascript-tutorial',
  updateFiles: true // skip same size files
}));
