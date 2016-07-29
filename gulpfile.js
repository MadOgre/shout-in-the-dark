var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
//var cp          = require('child_process');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('reload', function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'reload'], function() {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('public/scss/main.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                notify().write({
                    title: 'Gulp: SCSS',
                    message: error.message
                });
                console.log(error.message);
                browserSync.notify(error.message);
                this.emit("end");
            }
        }))
        .pipe(sass({
            includePaths: ['scss'],
            // outputStyle: "compressed",
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('public/css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
   // gulp.watch('public/scss/*.scss', []);
    gulp.watch(['public/**/*'], ['sass', 'reload']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
