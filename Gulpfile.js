/**
 * Created by KOALA on 11/10/2015.
 */

var gulp = require('gulp');
var compass  = require('gulp-compass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var gutil = require('gulp-util');

var config = {
    sassPath: './scss',
    cssDest: './css',
    bowerDir: './bower_components',
    configRb: './config.rb'
}

gulp.task('compass', function() {
    gulp.src(config.sassPath + '/**/*')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(compass({
            config_file: config.configRb,
            css: 'css',
            sass: 'scss',
            scss: 'scss'
        }))
        .on('error', gutil.log)
        .pipe(minifycss({processImport: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.cssDest));
});

gulp.task("default", ["compass"], function() {
    gulp.watch(config.sassPath + '/**/*', ["compass"])
})