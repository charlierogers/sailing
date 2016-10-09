/**
 * Created by charlie on 10/8/16.
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
    return browserify('./src/js/backboneApp.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    var injectSrc = gulp.src(['./public/css/*.css',
        './public/js/*.js', './public/js/backbone/*.js'], {read: false});

    var injectOptions = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['browserify', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        }
    };

    return nodemon(options)
        .on('restart', function () {
            console.log('Restarting');
        });
});
