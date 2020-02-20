/* eslint-disable vars-on-top */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');


function clean() {
  return del(['dist/scripts', 'dist/styles']);
}

var paths = {
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/scripts/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}


function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

var build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
