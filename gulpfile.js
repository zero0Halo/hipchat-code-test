'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');


gulp.task('sass:dev', function () {
  return gulp.src('./src/sass/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
    .pipe(gulp.dest('./dev/'));
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
});


gulp.task('watch:dev', function () {
  gulp.watch('./src/sass/*.scss', ['sass:dev']);
  gulp.watch('./src/index.html', ['html:dev']);
});