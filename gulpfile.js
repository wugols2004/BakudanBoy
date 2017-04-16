var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var watchify = require("watchify");
var webserver = require("gulp-webserver");

var paths = {
    sandbox: 'sandbox',
    sandboxdist: 'sandbox/dist/',
    dist: 'dist'
}

var watchedBrowserify = watchify(browserify({
            basedir: '.',
            debug: true,
            entries: ['src/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify))
    .transform('babelify', {
        presets: ['env'],
        extensions: ['.ts']
    });

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist))
        .pipe(gulp.dest(paths.sandboxdist));
}

gulp.task("default", ['webserver'], bundle);

gulp.task('webserver', function() {
    gulp.src(paths.sandbox)
        .pipe(webserver({
            port: 8080,
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);