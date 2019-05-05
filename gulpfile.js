/*=========================================*/ 
/*= галп 4 =============================== */
/*=========================================*/ 
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel       = require("gulp-babel");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps =  require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});
// Compile babel into js 
gulp.task('js', function() {
    return gulp.src(["assets/babel/polyfill_custom.js", "assets/babel/main.js"])
        .pipe(babel())
        .pipe(gulp.dest("assets/js"));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.parallel('sass', 'js', function() {

    browserSync.init({
        browser: 'chrome',
        server: "./assets",
        notify: false
    });

    gulp.watch("assets/sass/*.scss", gulp.series('sass'));
    gulp.watch('assets/babel/*.js', gulp.series('js'))
        .on('change', browserSync.reload)
        .on('unlink', function(path, stats) {
            console.log(path);
        });
    gulp.watch("assets/*.html").on('change', browserSync.reload);
}));


gulp.task('default', gulp.series('serve'));