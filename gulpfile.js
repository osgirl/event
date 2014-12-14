'use strict';

var gulp = require('gulp');
var componentHelper = require('gulp-component-helper')(gulp);
var paths = componentHelper.paths;
var runSequence = require('run-sequence');

var uglify = require('gulp-uglify');


gulp.task('pre-build', function(){
//    non common js file
    gulp.src('src/js/event.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/events'))
});

