var gulp = require('gulp');
var EmailBuilder = require('gulp-email-builder');
var sass = require('gulp-sass');
var options = { encodeSpecialChars: true };
var builder = EmailBuilder(options);

// SCRIPTS TASKS
// inliner task
gulp.task('emailBuilder', function() {
  return gulp.src(['./non-inline/*.html'])
    .pipe(builder.build())
    .pipe(gulp.dest('./generated-inline/'));
});

// Styles
gulp.task("styles", function(){
  gulp.src('./non-inline/sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./non-inline/css/'));
});

// watch task built in

gulp.task('default', ['styles', 'emailBuilder'], function() {
 //   gulp.watch('./non-inline/**/*', function() {
 //   gulp.run('default');
 // });
 gulp.watch('./non-inline/sass/**/*.scss*', function() {
  // run styles upon changes
  gulp.run('default',['styles']);
 });
 gulp.watch('./non-inline/*.html', function() {
  // run inline upon changes
    gulp.run('default',['emailBuilder']);
 });
});
