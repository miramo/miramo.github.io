/**
 * Created by KOALA on 11/10/2015.
 */

var gulp = require('gulp'),
    compass  = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    bower = require('gulp-bower'),
    notify = require('gulp-notify'),
    minifyHtml = require("gulp-minify-html"),
    livereload = require('gulp-livereload'),
    realFavicon = require('gulp-real-favicon'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant')
    fs = require('fs');

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
    imgPath: './img',
    imgDest: './assets/img',
    configRb: './config.rb'
}

var plumberErrorHandler = {
    errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }
};

gulp.task('compass', function() {
    return gulp.src(config.sassPath + '/**/*')
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            config_file: config.configRb,
            css: 'assets/css',
            sass: 'scss',
            scss: 'scss',
            image: 'assets/img'
        }))
        .pipe(gulp.dest(config.cssDest))
        .on('error', gutil.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss({processImport: false}))
        .pipe(gulp.dest(config.cssDest))
        .pipe(livereload())
        .pipe(notify({ message: 'Compass task complete' }));
});

gulp.task('compress', function() {
    return gulp.src(config.jsSrc)
        .pipe(plumber(plumberErrorHandler))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.jsDest))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.jsDest))
        .pipe(livereload())
        .pipe(notify({ message: 'Compress task complete' }));
});

gulp.task('images', function(cb) {
    return gulp.src(config.imgPath + '/**/*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.imgDest));
});

gulp.task("bower-restore", function () {
    return bower();
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(config.sassPath + '/**/*', ['compass']);
    gulp.watch(config.jsSrc, ['compress']);
});

gulp.task("default", ["compass", "compress"]);


/* -- FAVICONS START -- */
// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

var MASTER_FAVICON_PATH = config.imgPath + '/profil-square.jpg';
var DEST_FAVICON_PATH = './assets/favicons';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: MASTER_FAVICON_PATH,
        dest: DEST_FAVICON_PATH,
        iconsPath: DEST_FAVICON_PATH,
        design: {
            ios: {
                pictureAspect: 'noChange',
                appName: 'Maxime Miramond'
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#4caf50',
                onConflict: 'override',
                appName: 'Maxime Miramond'
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#4caf50',
                manifest: {
                    name: 'Maxime Miramond',
                    display: 'browser',
                    orientation: 'notSet',
                    onConflict: 'override'
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 50,
                themeColor: '#4caf50'
            }
        },
        settings: {
            compression: 3,
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
    gulp.src([ './index.html' ])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('.'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});
/* -- FAVICONS END -- */