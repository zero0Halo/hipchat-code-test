'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minify = require('gulp-minify');

var DEV = './dev';
var DIST = './dist';
var TESTING = './testing';

/**
 * [DEVELOPMENT TASKS]
 *
 *  These tasks are used purely for active development. All generated files are located in the 'dev' folder.
 *
 *  All files are unminified, and include sourcemaps.
 */

    // Generate css from sass file
    gulp.task('dev:sass', function () {
      var SRC = './src/sass/index.scss';

      return gulp.src(SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
        .pipe(gulp.dest(DEV))
        .pipe(connect.reload());
    });

    // Copy the html file to dev
    gulp.task('dev:html', function(){
      var SRC = './src/index.html';

      return gulp.src(SRC)
        .pipe(gulp.dest(DEV))
        .pipe(connect.reload());
    });

    // Generate es5 from es6
    gulp.task('dev:js', function(){
      var SRC = './src/js/*.js';

      return gulp.src(SRC)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEV));
    });

    // Use browserify to roll files into one
    gulp.task('dev:browserify', ['dev:js'], function() {
      var BUNDLE = 'index-bundle.js';
      var SRC = './dev/index.js';

      const B = browserify({
        entries: SRC,
        debug: true
      });

      return B.bundle()
        .pipe(source(BUNDLE))
        .pipe(buffer())
        .pipe(gulp.dest(DEV))
        .pipe(connect.reload())
    });

    // Point the server to the dev folder
    gulp.task('dev:connect', function() {
      connect.server({
        root: DEV,
        livereload: true
      });
    });

    // The default task is to run the project in development mode
    gulp.task('default', ['dev:connect', 'dev:html', 'dev:sass', 'dev:browserify'], function () {
      gulp.watch('./src/sass/*.scss', ['dev:sass']);
      gulp.watch('./src/index.html', ['dev:sass']);
      gulp.watch('./src/js/*.js', ['dev:browserify']);
    });




/**
 * [TESTING TASKS]
 *
 *  These tasks are used to test the project.
 *
 *  Note that unlike the actual project, I am not importing QUnit or transpiling code.
 *  This is as close to how QUnit implements its tests based on their documentation examples.
 */

    // Point the server to the testing folder
    gulp.task('test:connect', function() {
      connect.server({
        root: TESTING
      });
    });

    // Generate an instance of the latest js file, then place it in the testing folder
    gulp.task('test', ['test:connect', 'dev:browserify'], function(){
      var SRC = 'dev/index-bundle.js';
      var DEST = TESTING + '/dev';

      gulp.src(SRC)
        .pipe(gulp.dest(DEST));
    });




/**
 * [DISTRIBUTION TASKS]
 *
 *  These tasks are used to prepare the project for distribution.
 *
 *  These files are minified and without sourcemaps.
 *  A server is spun up to view the project to verify there are no errors.
 */

    // Render sass as compressed css
    gulp.task('dist:sass', function () {
      var SRC = './src/sass/index.scss';

      return gulp.src(SRC)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
        .pipe(gulp.dest(DIST));
    });

    // Copy index to the dist folder
    gulp.task('dist:html', function(){
      var SRC = './src/index.html';

      return gulp.src(SRC)
        .pipe(gulp.dest(DIST))
        .pipe(connect.reload());
    });

    // Transpile es6 to es5 w/o sourcemaps
    gulp.task('dist:js', function(){
      var SRC = './src/js/*.js';

      return gulp.src(SRC)
        .pipe(babel())
        .pipe(gulp.dest(DIST));
    });

    // Use browserify to roll up modules into one file
    gulp.task('dist:browserify', ['dist:js'], function() {
      var BUNDLE = 'index-bundle.js';
      var SRC = './dist/index.js';

      const B = browserify({
        entries: SRC,
        debug: true
      });

      return B.bundle()
        .pipe(source(BUNDLE))
        .pipe(buffer())
        .pipe(gulp.dest(DIST))
        .pipe(connect.reload())
    });

    // Minifies the index-bundle.js file
    gulp.task('dist:minify', ['dist:browserify'], function(){
      var SRC = './dist/index-bundle.js';

      gulp.src(SRC)
        .pipe(minify({
          ext:{
              src:'-debug.js',
              min:'.js'
          }
        }))
        .pipe(gulp.dest(DIST));
    });

    // The dist task is the entry point for creating the product to use for distribution
    gulp.task('dist', ['dist:sass', 'dist:html', 'dist:minify'], function(){
      connect.server({
        root: DIST
      });
    });
