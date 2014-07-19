var gulp = require('gulp'),
   uglify = require('gulp-uglify');

gulp.task('minify-js', function () {
   gulp.src('library/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('build'));
});


// var watcher = gulp.watch(['library/js/**/*.js','library/scss/**/*.scss'], ['uglify','reload']);
// watcher.on('change', function(event) {
//   console.log('File '+event.path+' was '+event.type+', running tasks...');
// });