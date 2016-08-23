'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'server.js',

    // watch core server file(s) that require server restart on change
    watch: ['**/*.js', '!public/js/**/*']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        console.log('reloading...');
        browserSync.reload();
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

    var browserPath = '';
    if (process.env.COMPUTERNAME === 'PHILLAPTOP' || process.env.COMPUTERNAME === 'VENATOR') {
        browserPath = 'chrome.exe';
    } else {
        browserPath = 'google-chrome';
    }

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: [browserPath]
  });
});

gulp.task('js',  function () {
  return gulp.src('public/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  // return gulp.src('public/**/*.css')
  //   .pipe(browserSync.reload({ stream: true }));
    return gulp.src('public/scss/main.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                notify().write({
                    title: 'Gulp: SCSS',
                    message: error.message
                });
                console.log(error.message);
                browserSync.notify(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: ['scss'],
            // outputStyle: 'compressed',
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('public/css'));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
  gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('public/**/*.scss',  ['css']);
  gulp.watch('public/**/*.html', ['bs-reload']);
});
