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
var sequence = require('run-sequence');


gulp.task('sass:dev', function () {
  return gulp.src('./src/sass/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
    .pipe(gulp.dest('./dev/'))
    .pipe(connect.reload());
});


gulp.task('sass:prod', function () {
  return gulp.src('./src/sass/index.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('html:dev', function(){
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dev'))
    .pipe(connect.reload());
});


gulp.task('js:dev', function(){
  return gulp.src('./src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dev'))
    .pipe(connect.reload());
});


gulp.task('browserify:dev', function() {
  var BUNDLE = 'index-bundle.js';
  var SRC = './dev/index.js';
  var DEST = './dev'

  const B = browserify({
    entries: SRC,
    debug: true
  });

  return B.bundle()
    .pipe(source(BUNDLE))
    .pipe(buffer())
    .pipe(gulp.dest(DEST));
});


gulp.task('connect', function() {
  connect.server({
    root: 'dev',
    livereload: true
  });
});


gulp.task('watch:dev', ['connect'], function () {
  gulp.watch('./src/sass/*.scss', ['sass:dev']);
  gulp.watch('./src/index.html', ['html:dev']);
  gulp.watch('./src/js/*.js', function(){
    sequence('js:dev', 'browserify:dev');
  });
});
