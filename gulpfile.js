var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('scss/style.scss')
    .pipe(sass({errLogToConsole:true,
                outputStyle: 'expanded'}))
    .pipe(gulp.dest('css'))
});

gulp.task('watch', function(){
  gulp.watch('scss/**/*.scss', ['sass']);
})
