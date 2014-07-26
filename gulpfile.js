var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('lint-js', function() {
  return gulp.src(['library/js/**/*.js','!library/js/libs/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify-js', function () {
  return gulp.src(['library/js/**/*.js', '!library/js/libs/modernizr.custom.min.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('modernizr', function () {
  return gulp.src('library/js/libs/**/*.js')
    .pipe(gulp.dest('build/js/libs'))
});

gulp.task('sass', function () {
  return gulp.src('library/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});


gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('library/js/**/*.js', ['lint-js', 'minify-js']);
  gulp.watch('library/scss/**/*.scss', ['sass']);
  gulp.watch('build/**/*').on('change', livereload.changed);
});

gulp.task('default',[
  'modernizr',
  'lint-js',
  'minify-js',
  'sass',
  'watch'
]);
