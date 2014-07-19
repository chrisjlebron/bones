var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('lint-js', function() {
  return gulp.src('library/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify-js', function () {
  return gulp.src('library/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('sass', function () {
  return gulp.src('library/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'));
});


gulp.task('watch', function () {
  gulp.watch('library/js/*.js', ['lint-js', 'minify-js']);
  gulp.watch('library/scss/*.scss', ['sass']);
});

gulp.task('default',[
  'lint-js',
  'sass',
  'minify-js',
  'watch'
]);

// var watcher = gulp.watch(['library/js/**/*.js','library/scss/**/*.scss'], ['uglify','reload']);
// watcher.on('change', function(event) {
//   console.log('File '+event.path+' was '+event.type+', running tasks...');
// });