/**
 * Created by KOALA on 11/10/2015.
 */

var gulp = require('gulp');
var compass  = require('gulp-compass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var bower = require('gulp-bower');

var config = {
    sassPath: './scss',
    cssDest: './assets/css',
    bowerDir: './bower_components',
    jsSrc: [
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/jquery.easing/js/jquery.easing.min.js",
        "./bower_components/jquery.scrollTo/jquery.scrollTo.min.js",
        "./bower_components/materialize/dist/js/materialize.min.js",
        './js/**/*'
    ],
    jsPath: './js',
    jsDest: './assets/js',
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

gulp.task('compress', function() {
    gulp.src(config.jsSrc)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.jsDest))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.jsDest));
});

gulp.task("bower-restore", function () {
    return bower();
});

gulp.task("default", ["compass", "compress"], function() {
    gulp.watch(config.sassPath + '/**/*', ["compass"])
    gulp.watch(config.jsSrc, ["compress"])
})