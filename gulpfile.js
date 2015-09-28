var gulp = require('gulp');

var clean           = require('gulp-clean');
var rename          = require('gulp-rename');
var jshint          = require('gulp-jshint');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');

var outputFolder    = "build";

gulp.task('clean', function() {
    return gulp.src(outputFolder, {read: false})
        .pipe(clean());
});

gulp.task('assets', function() {
    return gulp.src(['src/**/*', '!src/**/*.js', '!src/**/*.css', '!src/**/*.scss'])
        .pipe(gulp.dest(outputFolder));
});

gulp.task('css', function() {
    return gulp.src('src/css/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(outputFolder + '/css'));
});


gulp.task('lint', function() {
    return gulp.src(['src/**/*.js', '!/**/*-min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(outputFolder + '/js'))
        .pipe(rename({
            suffix: '-min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(outputFolder + '/js'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*', '!src/**/*.js', '!src/**/*.css', '!src/**/*.scss'], ['assets']);
    gulp.watch('src/css/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['lint', 'js']);
});

gulp.task('default', ['assets', 'css', 'lint', 'js', 'watch']);
